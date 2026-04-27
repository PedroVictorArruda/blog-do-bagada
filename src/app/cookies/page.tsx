import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Cookies — Blog do Bagada",
  description: "Entenda como o Blog do Bagada utiliza cookies e como você pode gerenciá-los.",
};

export default function CookiesPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider mb-2">Legal</p>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Política de Cookies</h1>
        <p className="text-gray-500 text-sm">Última atualização: 27 de abril de 2026</p>
      </div>

      <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. O que são Cookies?</h2>
          <p>
            Cookies são pequenos arquivos de texto armazenados no seu dispositivo (computador, tablet ou celular)
            quando você visita um site. Eles permitem que o site lembre suas preferências e melhore sua experiência
            de navegação.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Como Usamos Cookies</h2>
          <p>O Blog do Bagada utiliza cookies para as seguintes finalidades:</p>

          <div className="mt-4 space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-1">Cookies Essenciais</h3>
              <p className="text-sm">
                Necessários para o funcionamento básico do site. Não podem ser desativados. Exemplos: cookies de
                sessão e segurança.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-1">Cookies de Desempenho / Análise</h3>
              <p className="text-sm">
                Usamos o <strong>Google Analytics</strong> para entender como os visitantes interagem com o site
                (páginas mais acessadas, tempo de permanência, origem do tráfego). Os dados são anonimizados e
                usados apenas para fins estatísticos.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-1">Cookies de Publicidade</h3>
              <p className="text-sm">
                Utilizamos o <strong>Google AdSense</strong> para exibir anúncios. O Google pode usar cookies
                para personalizar os anúncios com base nos seus interesses e histórico de navegação. Você pode
                gerenciar as preferências de anúncios personalizados em{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  adssettings.google.com
                </a>.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-1">Cookies de Funcionalidade</h3>
              <p className="text-sm">
                Lembram suas preferências (como tema ou idioma) para personalizar sua experiência nas próximas
                visitas.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Cookies de Terceiros</h2>
          <p>Alguns parceiros que podem instalar cookies no seu dispositivo ao visitar nosso site:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              <strong>Google Analytics</strong> — análise de tráfego.{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Política de privacidade do Google
              </a>
            </li>
            <li>
              <strong>Google AdSense</strong> — exibição de anúncios personalizados.{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Como o Google usa cookies em publicidade
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Como Gerenciar Cookies</h2>
          <p>
            Você pode controlar e/ou excluir cookies a qualquer momento pelas configurações do seu navegador.
            Veja como fazer isso nos principais navegadores:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>
              <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Google Chrome
              </a>
            </li>
            <li>
              <a href="https://support.mozilla.org/pt-BR/kb/gerencie-configuracoes-de-armazenamento-local-de-s" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a href="https://support.apple.com/pt-br/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Safari
              </a>
            </li>
            <li>
              <a href="https://support.microsoft.com/pt-br/microsoft-edge/excluir-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Microsoft Edge
              </a>
            </li>
          </ul>
          <p className="mt-3 text-sm text-gray-500">
            Atenção: desativar determinados cookies pode afetar a funcionalidade do site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Opt-out de Anúncios Personalizados</h2>
          <p>
            Para desativar anúncios personalizados do Google, acesse{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              adssettings.google.com
            </a>{" "}
            ou instale o{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              complemento de desativação do Google Analytics
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Atualizações desta Política</h2>
          <p>
            Esta Política de Cookies pode ser atualizada para refletir mudanças em nossas práticas ou por exigência
            legal. Recomendamos revisá-la periodicamente.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap gap-4 text-sm text-gray-500">
        <Link href="/termos" className="text-blue-600 hover:underline">Termos de Uso</Link>
        <span>·</span>
        <Link href="/privacidade" className="text-blue-600 hover:underline">Política de Privacidade</Link>
      </div>
    </main>
  );
}
