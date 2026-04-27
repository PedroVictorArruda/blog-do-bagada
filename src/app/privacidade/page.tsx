import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade — Blog do Bagada",
  description: "Saiba como o Blog do Bagada coleta, usa e protege seus dados pessoais.",
};

export default function PrivacidadePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider mb-2">Legal</p>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Política de Privacidade</h1>
        <p className="text-gray-500 text-sm">Última atualização: 27 de abril de 2026</p>
      </div>

      <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Quem somos</h2>
          <p>
            O Blog do Bagada é um portal de notícias e entretenimento. Esta Política de Privacidade explica como
            tratamos os dados coletados quando você visita nosso site (<strong>blogdobagada.com.br</strong>),
            em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Dados que Coletamos</h2>
          <p>Podemos coletar as seguintes informações:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              <strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas visitadas, tempo de
              permanência e fonte de acesso — coletados automaticamente via cookies e ferramentas de análise.
            </li>
            <li>
              <strong>Dados fornecidos por você:</strong> nome e e-mail, quando você comenta em alguma publicação
              ou nos envia uma mensagem de contato.
            </li>
            <li>
              <strong>Dados de anúncios:</strong> parceiros de publicidade, como o Google AdSense, podem coletar
              dados para exibir anúncios relevantes. Consulte a política de privacidade do Google para mais detalhes.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Como Usamos os Dados</h2>
          <p>Utilizamos as informações coletadas para:</p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Analisar o desempenho do site e melhorar a experiência do usuário;</li>
            <li>Exibir anúncios personalizados por meio de parceiros publicitários;</li>
            <li>Responder a comentários e mensagens de contato;</li>
            <li>Cumprir obrigações legais e regulatórias.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Compartilhamento de Dados</h2>
          <p>
            Não vendemos seus dados pessoais. Podemos compartilhá-los apenas nas seguintes situações:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Com parceiros de análise e publicidade (ex.: Google Analytics, Google AdSense) para operar o site;</li>
            <li>Por exigência legal, como cumprimento de ordens judiciais ou requisições de autoridades competentes.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Seus Direitos (LGPD)</h2>
          <p>Nos termos da LGPD, você tem direito a:</p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Confirmar a existência de tratamento de seus dados;</li>
            <li>Acessar, corrigir ou solicitar a exclusão de seus dados;</li>
            <li>Revogar o consentimento a qualquer momento;</li>
            <li>Solicitar a portabilidade dos dados.</li>
          </ul>
          <p className="mt-3">
            Para exercer seus direitos, envie um e-mail para{" "}
            <a href="mailto:privacidade@blogdobagada.com.br" className="text-blue-600 hover:underline">
              privacidade@blogdobagada.com.br
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Retenção de Dados</h2>
          <p>
            Mantemos seus dados apenas pelo tempo necessário para as finalidades descritas nesta política ou para
            cumprimento de obrigações legais. Dados de navegação são anonimizados após 26 meses.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Segurança</h2>
          <p>
            Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não
            autorizado, perda ou divulgação indevida. No entanto, nenhuma transmissão pela internet é 100% segura,
            e não podemos garantir segurança absoluta.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. Links para Sites de Terceiros</h2>
          <p>
            Nosso site pode conter links para outros sites. Esta política se aplica apenas ao Blog do Bagada.
            Recomendamos que você leia as políticas de privacidade dos sites que visitar.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">9. Alterações nesta Política</h2>
          <p>
            Podemos atualizar esta Política de Privacidade periodicamente. A data no topo da página indica a
            versão mais recente. Recomendamos revisá-la regularmente.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contato</h2>
          <p>
            Dúvidas sobre privacidade? Fale conosco:{" "}
            <a href="mailto:privacidade@blogdobagada.com.br" className="text-blue-600 hover:underline">
              privacidade@blogdobagada.com.br
            </a>.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap gap-4 text-sm text-gray-500">
        <Link href="/termos" className="text-blue-600 hover:underline">Termos de Uso</Link>
        <span>·</span>
        <Link href="/cookies" className="text-blue-600 hover:underline">Política de Cookies</Link>
      </div>
    </main>
  );
}
