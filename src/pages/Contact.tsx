import { FormEvent } from 'react';
import { Mail, Phone, MessageCircle, Send, MapPin } from 'lucide-react';
import { Language } from '../i18n';

interface ContactProps {
  language: Language;
}

export function Contact({ language }: ContactProps) {
  const isEnglish = language === 'en';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fields = Object.fromEntries(form.entries());
    const subject = isEnglish
      ? `Quotation request — ${fields.company || 'International buyer'}`
      : `Demande de cotation — ${fields.company || 'Acheteur international'}`;
    const body = isEnglish
      ? `Company: ${fields.company}\nCountry: ${fields.country}\nContact email: ${fields.email}\nProduct: ${fields.product}\nEstimated quantity: ${fields.quantity}\nDestination port: ${fields.destination}\n\nAdditional information:\n${fields.message}`
      : `Entreprise : ${fields.company}\nPays : ${fields.country}\nEmail : ${fields.email}\nProduit : ${fields.product}\nQuantité estimée : ${fields.quantity}\nPort de destination : ${fields.destination}\n\nInformations complémentaires :\n${fields.message}`;
    window.location.href = `mailto:mbenslimane522@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300">
            {isEnglish ? 'B2B enquiries' : 'Demandes B2B'}
          </p>
          <h1 className="mt-3 text-4xl sm:text-6xl font-black tracking-tight">
            {isEnglish ? 'Request product information or a quotation' : 'Demander des informations ou une cotation'}
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-300">
            {isEnglish
              ? 'Share your requirements and destination. We will prepare the relevant product information.'
              : 'Indiquez vos besoins et votre destination. Nous préparerons les informations produits adaptées.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-[.7fr_1.3fr] gap-8">
        <aside className="space-y-5">
          <div className="rounded-3xl bg-slate-950 p-7 text-white">
            <h2 className="text-2xl font-black">{isEnglish ? 'Direct contact' : 'Contact direct'}</h2>
            <p className="mt-2 text-sm text-slate-400">
              {isEnglish ? 'Contact Mohammed Benslimane for product and commercial enquiries.' : 'Contactez Mohammed Benslimane pour les demandes produits et commerciales.'}
            </p>
            <div className="mt-7 space-y-5">
              <a href="mailto:mbenslimane522@gmail.com" className="flex gap-3 text-sm hover:text-cyan-300">
                <Mail className="h-5 w-5 shrink-0 text-cyan-300" />
                <span>mbenslimane522@gmail.com</span>
              </a>
              <a href="tel:+212663200846" className="flex gap-3 text-sm hover:text-cyan-300">
                <Phone className="h-5 w-5 shrink-0 text-cyan-300" />
                <span>+212 663 20 08 46</span>
              </a>
              <div className="flex gap-3 text-sm">
                <MapPin className="h-5 w-5 shrink-0 text-cyan-300" />
                <span>Morocco</span>
              </div>
            </div>
            <a
              href="https://wa.me/212663200846"
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3.5 font-bold text-slate-950 hover:bg-cyan-300"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7">
            <h3 className="font-black text-slate-950">{isEnglish ? 'Helpful information' : 'Informations utiles'}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {isEnglish
                ? 'For a faster quotation, include the product, quantity, packaging, destination port and required delivery period.'
                : 'Pour une cotation plus rapide, indiquez le produit, la quantité, le conditionnement, le port de destination et la période souhaitée.'}
            </p>
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            {isEnglish ? 'Prepare your quotation request' : 'Préparer votre demande de cotation'}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {isEnglish ? 'This form prepares an email in your mail application.' : 'Ce formulaire prépare un email dans votre application de messagerie.'}
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-5">
            <label className="text-sm font-bold text-slate-700">
              {isEnglish ? 'Company *' : 'Entreprise *'}
              <input name="company" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100" />
            </label>
            <label className="text-sm font-bold text-slate-700">
              {isEnglish ? 'Country *' : 'Pays *'}
              <input name="country" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100" />
            </label>
            <label className="text-sm font-bold text-slate-700">
              {isEnglish ? 'Professional email *' : 'Email professionnel *'}
              <input name="email" type="email" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100" />
            </label>
            <label className="text-sm font-bold text-slate-700">
              {isEnglish ? 'Product *' : 'Produit *'}
              <select name="product" required className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100">
                <option value="">{isEnglish ? 'Select a product' : 'Choisir un produit'}</option>
                <option>{isEnglish ? 'Frozen sardine fillets' : 'Filets de sardines congelés'}</option>
                <option>{isEnglish ? 'Marinated anchovies' : 'Anchois marinés'}</option>
                <option>{isEnglish ? 'Marinated sardines' : 'Sardines marinées'}</option>
                <option>{isEnglish ? 'Other seafood enquiry' : 'Autre demande produits de la mer'}</option>
              </select>
            </label>
            <label className="text-sm font-bold text-slate-700">
              {isEnglish ? 'Estimated quantity' : 'Quantité estimée'}
              <input name="quantity" placeholder={isEnglish ? 'Example: 1 pallet / 1 container' : 'Exemple : 1 palette / 1 conteneur'} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100" />
            </label>
            <label className="text-sm font-bold text-slate-700">
              {isEnglish ? 'Destination port' : 'Port de destination'}
              <input name="destination" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100" />
            </label>
            <label className="sm:col-span-2 text-sm font-bold text-slate-700">
              {isEnglish ? 'Additional information' : 'Informations complémentaires'}
              <textarea name="message" rows={5} className="mt-2 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100" />
            </label>
          </div>
          <button type="submit" className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-4 font-bold text-slate-950 hover:bg-cyan-400">
            <Send className="h-5 w-5" />
            {isEnglish ? 'Prepare email request' : 'Préparer la demande par email'}
          </button>
        </form>
      </div>
    </div>
  );
}
