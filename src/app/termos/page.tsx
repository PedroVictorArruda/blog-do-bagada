import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Uso — Blog do Bagada",
  description: "Leia os Termos de Uso do Blog do Bagada e entenda as regras de utilização do nosso conteúdo.",
};

export default function TermosPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider mb-2">Legal</p>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Termos de Uso</h1>
        <p className="text-gray-500 text-sm">Última atualização: 27 de abril de 2026</p>
      </div>

      <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar e utilizar o Blog do Bagada (<strong>blogdobagada.com.br</strong>), você concorda com estes
            Termos de Uso. Caso não concorde com qualquer parte destes termos, pedimos que não utilize nosso site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Uso do Conteúdo</h2>
          <p>
            Todo o conteúdo publicado neste blog — incluindo textos, imagens, vídeos e demais materiais — é protegido
            por direitos autorais e pertence ao Blog do Bagada ou a seus respectivos autores. É permitido:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Compartilhar links para nossas publicações nas redes sociais;</li>
            <li>Reproduzir trechos curtos (até 3 parágrafos) com a devida atribuição e link para o conteúdo original.</li>
          </ul>
          <p className="mt-3">É expressamente proibido:</p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Reproduzir conteúdo completo sem autorização prévia por escrito;</li>
            <li>Utilizar o conteúdo para fins comerciais sem nossa permissão;</li>
            <li>Remover marcas d'água ou atribuições de autoria.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Isenção de Responsabilidade</h2>
          <p>
            O Blog do Bagada se esforça para publicar informações precisas e atualizadas, mas não garante a
            completude ou exatidão do conteúdo. As informações aqui disponíveis têm caráter informativo e não
            substituem orientação profissional (médica, jurídica, financeira etc.). O uso das informações publicadas
            é de inteira responsabilidade do leitor.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Links Externos</h2>
          <p>
            Nosso site pode conter links para sites de terceiros. Esses links são fornecidos apenas para sua
            conveniência. Não temos controle sobre o conteúdo de sites externos e não nos responsabilizamos por
            suas práticas de privacidade ou conteúdo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Comentários e Conduta do Usuário</h2>
          <p>
            Ao publicar comentários em nosso blog, você concorda em não postar conteúdo que seja:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Ofensivo, discriminatório, difamatório ou ilegal;</li>
            <li>Spam ou propaganda não solicitada;</li>
            <li>Violador de direitos de terceiros.</li>
          </ul>
          <p className="mt-3">
            Reservamo-nos o direito de remover comentários que violem estas diretrizes sem aviso prévio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Modificações</h2>
          <p>
            Podemos atualizar estes Termos de Uso a qualquer momento. As alterações entram em vigor imediatamente
            após a publicação. O uso continuado do site após modificações representa sua aceitação dos novos termos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Contato</h2>
          <p>
            Dúvidas sobre estes termos? Entre em contato conosco pelo e-mail{" "}
            <a href="mailto:contato@blogdobagada.com.br" className="text-blue-600 hover:underline">
              contato@blogdobagada.com.br
            </a>.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap gap-4 text-sm text-gray-500">
        <Link href="/privacidade" className="text-blue-600 hover:underline">Política de Privacidade</Link>
        <span>·</span>
        <Link href="/cookies" className="text-blue-600 hover:underline">Política de Cookies</Link>
      </div>
    </main>
  );
}
