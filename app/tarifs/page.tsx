import Navbar from '@/components/Navbar';

export default function TarifsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Nos tarifs
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Des solutions adaptées à tous les établissements
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {/* Pack Essentiel */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center">Essentiel</h3>
              <div className="mt-4 flex justify-center">
                <span className="text-5xl font-extrabold text-gray-900">29€</span>
                <span className="text-xl font-medium text-gray-500 self-end mb-1">/mois</span>
              </div>
              <p className="mt-4 text-gray-600 text-center">Pour les petits établissements</p>
            </div>
            <div className="px-6 pt-6 pb-8">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-gray-600">Jusqu'à 200 élèves</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-gray-600">Gestion des notes</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-gray-600">Support email</span>
                </li>
              </ul>
              <button className="mt-8 w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition-colors">
                Commencer
              </button>
            </div>
          </div>

          {/* Pack Pro */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-500 relative">
            <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg text-sm font-medium">
              Populaire
            </div>
            <div className="px-6 py-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center">Pro</h3>
              <div className="mt-4 flex justify-center">
                <span className="text-5xl font-extrabold text-gray-900">79€</span>
                <span className="text-xl font-medium text-gray-500 self-end mb-1">/mois</span>
              </div>
              <p className="mt-4 text-gray-600 text-center">Pour les établissements moyens</p>
            </div>
            <div className="px-6 pt-6 pb-8">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-gray-600">Jusqu'à 1000 élèves</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-gray-600">Toutes les fonctionnalités Essentiel</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-gray-600">Support prioritaire</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-gray-600">Module comptabilité</span>
                </li>
              </ul>
              <button className="mt-8 w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition-colors">
                Commencer
              </button>
            </div>
          </div>

          {/* Pack Enterprise */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center">Enterprise</h3>
              <div className="mt-4 flex justify-center">
                <span className="text-5xl font-extrabold text-gray-900">Sur mesure</span>
              </div>
              <p className="mt-4 text-gray-600 text-center">Pour les grands établissements</p>
            </div>
            <div className="px-6 pt-6 pb-8">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-gray-600">Nombre d'élèves illimité</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-gray-600">Toutes les fonctionnalités Pro</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-gray-600">Support dédié 24/7</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 text-gray-600">Personnalisation complète</span>
                </li>
              </ul>
              <button className="mt-8 w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition-colors">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
