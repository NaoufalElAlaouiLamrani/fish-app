import { Mail, Phone } from 'lucide-react';

export function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-xl text-cyan-50">
            Nous sommes à votre écoute pour répondre à vos besoins
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Nos coordonnées</h2>
              <p className="text-gray-600">
                Contactez-nous directement par téléphone ou par e-mail.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-cyan-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">E-mail</p>
                  <a
                    href="mailto:mbenslimane522@gmail.com"
                    className="text-cyan-700 hover:text-cyan-800"
                  >
                    mbenslimane522@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-6 w-6 text-cyan-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Téléphone et WhatsApp</p>
                  <a href="tel:+212663200846" className="text-cyan-700 hover:text-cyan-800">
                    +212(0) 6 63 20 08 46
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+212663200846"
                className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl text-center"
              >
                Appeler
              </a>
              <a
                href="mailto:mbenslimane522@gmail.com"
                className="flex-1 border border-cyan-200 text-cyan-700 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-50 transition-all text-center"
              >
                Envoyer un e-mail
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
