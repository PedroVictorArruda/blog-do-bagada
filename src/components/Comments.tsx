"use client";

import { useState } from "react";
import { WpComment, postComment } from "@/lib/wp";
import { User, MessageSquare, CornerDownRight } from "lucide-react";

interface CommentsProps {
  postId: number;
  initialComments: WpComment[];
  postTitle: string;
}

export default function Comments({ postId, initialComments, postTitle }: CommentsProps) {
  const [comments, setComments] = useState<WpComment[]>(initialComments);
  const [replyTo, setReplyTo] = useState<WpComment | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: ""
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Organiza comentários em árvore (apenas 1 nível de profundidade conforme o print parece sugerir ou simplificando)
  const rootComments = comments.filter(c => c.parent === 0);
  const getReplies = (parentId: number) => comments.filter(c => c.parent === parentId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const result = await postComment({
      post: postId,
      author_name: formData.name,
      author_email: formData.email,
      content: formData.content,
      parent: replyTo?.id
    });

    if (result.success) {
      setStatus({ type: 'success', message: result.message });
      setFormData({ name: "", email: "", content: "" });
      setReplyTo(null);
    } else {
      setStatus({ type: 'error', message: result.message });
    }
    setIsSubmitting(false);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(',', ' às');
  };

  return (
    <div className="mt-16 border-t border-gray-100 pt-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-8">
        {comments.length} {comments.length === 1 ? 'comentário' : 'comentários'} para "{postTitle}"
      </h3>

      {/* Lista de Comentários */}
      <div className="space-y-8 mb-16">
        {rootComments.map(comment => (
          <div key={comment.id} className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-bold text-gray-900">De {comment.author_name}</span>
                <span className="text-gray-400 text-sm">({formatDate(comment.date)})</span>
              </div>
              <div 
                className="text-gray-700 leading-relaxed mb-4 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
              />
              <button 
                onClick={() => {
                  setReplyTo(comment);
                  document.getElementById('comment-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-3 h-3" />
                Responder
              </button>
            </div>

            {/* Respostas */}
            {getReplies(comment.id).map(reply => (
              <div key={reply.id} className="ml-8 md:ml-12 flex gap-4">
                <div className="mt-4 text-gray-300">
                  <CornerDownRight className="w-6 h-6" />
                </div>
                <div className="flex-1 bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-gray-900">De {reply.author_name}</span>
                    <span className="text-gray-400 text-sm">({formatDate(reply.date)})</span>
                  </div>
                  <div 
                    className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: reply.content.rendered }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}

        {comments.length === 0 && (
          <p className="text-gray-500 italic text-center py-8">Seja o primeiro a comentar!</p>
        )}
      </div>

      {/* Formulário */}
      <div id="comment-form" className="bg-gray-50 p-8 rounded-3xl border border-gray-100 scroll-mt-24">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {replyTo ? `Respondendo a ${replyTo.author_name}` : 'Deixe uma resposta para essa notícia'}
        </h3>
        <p className="text-gray-500 text-sm mb-8">
          O seu endereço de e-mail não será publicado. Campos obrigatórios são marcados com <span className="text-red-500">*</span>
        </p>

        {replyTo && (
          <button 
            onClick={() => setReplyTo(null)}
            className="text-blue-600 text-sm font-bold mb-4 hover:underline block"
          >
            Cancelar resposta
          </button>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <textarea
              required
              placeholder="Seu comentário*"
              value={formData.content}
              onChange={e => setFormData({...formData, content: e.target.value})}
              className="w-full border border-gray-200 rounded-2xl p-5 focus:ring-2 focus:ring-blue-500 outline-none min-h-[180px] bg-white transition-all shadow-sm"
            ></textarea>
            <p className="text-gray-400 text-xs mt-2">{formData.content.length}/1000.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              required
              type="text"
              placeholder="Seu nome*"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full border border-gray-200 rounded-full px-6 py-4 focus:ring-2 focus:ring-blue-500 outline-none bg-white transition-all shadow-sm"
            />
            <input
              required
              type="email"
              placeholder="Seu email*"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full border border-gray-200 rounded-full px-6 py-4 focus:ring-2 focus:ring-blue-500 outline-none bg-white transition-all shadow-sm"
            />
          </div>

          {status && (
            <div className={`p-4 rounded-xl text-sm font-medium ${
              status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
            }`}>
              {status.message}
            </div>
          )}

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-full transition-all duration-300 shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Publicar comentário'}
          </button>
        </form>
      </div>
    </div>
  );
}
