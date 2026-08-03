// ⚠️ FICHIER GENERE — NE PAS MODIFIER A LA MAIN.
//
// Genere par hosmate_ai/tool/generer_pages_legales.py depuis les fichiers de
// traduction de l'application (lib/l10n/app_*.arb), qui restent la SEULE
// source de ces textes.
//
// Les recopier ici a la main creerait une deuxieme version d'un document
// CONTRACTUEL : deux promesses differentes faites au meme client, qui
// divergeraient a la premiere modification. Pour changer un texte, modifier
// l'ARB puis relancer :
//     python tool/generer_pages_legales.py
//
// Ces pages existent parce que Google Play exige une URL publique vers la
// politique de confidentialite — les textes n'etaient accessibles que depuis
// l'interieur de l'application.

import { useEffect } from 'react'
import { Link } from 'react-router-dom'

type Lang = 'fr' | 'en' | 'es' | 'it'
type Doc = 'privacy' | 'terms'
type Section = { title: string; body: string }

const CONTENU: Record<Doc, Record<Lang, Section[]>> = {
  "privacy": {
    "fr": [
      {
        "title": "Introduction",
        "body": "Bienvenue sur HostMate AI. Nous respectons votre vie privée et nous engageons à protéger vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations."
      },
      {
        "title": "1. Données Collectées",
        "body": "• Informations de compte: nom, email, mot de passe (chiffré)\n• Informations sur les appartements: adresses, photos, descriptions\n• Données des clients: noms, dates de séjour, coordonnées\n• Historique de notifications et messages\n• Métadonnées d'utilisation: logs d'accès, interactions dans l'app"
      },
      {
        "title": "2. Utilisation des Données",
        "body": "• Fournir et améliorer nos services\n• Envoyer des notifications de rappel pour les missions\n• Analyser les performances de l'application\n• Prévenir les fraudes et abus\n• Respecter les obligations légales"
      },
      {
        "title": "3. Sécurité",
        "body": "• Chiffrement SSL/TLS pour toutes les communications\n• Stockage sécurisé avec Supabase (PostgreSQL, avec sécurité au niveau des lignes : vos données ne sont jamais visibles par un autre hôte)\n• Authentification sécurisée via Supabase (email/mot de passe ou Google)\n• Accès limité aux données (seulement les vôtres)\n• Suivi des erreurs via Firebase Crashlytics pour corriger les bugs rapidement"
      },
      {
        "title": "4. Partage de Données",
        "body": "• Vos données ne sont JAMAIS vendues, et jamais utilisées à des fins publicitaires\n• Hébergement et base de données : Supabase\n• Génération des messages IA : Anthropic (Claude), Google (Gemini), OpenRouter, Groq — reçoivent les informations nécessaires à la rédaction d'un message (nom, dates, notes, code d'accès, mot de passe WiFi)\n• Envoi des emails : Resend\n• Notifications et diagnostics techniques : Firebase (Google)\n• Paiements et abonnements : RevenueCat\n• Affichage de carte et recherche d'adresse : OpenStreetMap\n• Chaque prestataire n'accède qu'aux données nécessaires à sa fonction"
      },
      {
        "title": "5. Vos Droits (RGPD)",
        "body": "• Droit d'accès : demandez une copie de vos données\n• Droit de rectification : modifiez vos informations dans l'app ou en nous contactant\n• Droit à l'oubli : supprimez votre compte à tout moment depuis les Réglages\n• Droit à la portabilité : contactez-nous pour recevoir vos données dans un format exploitable\n• Droit d'opposition : contactez-nous pour vous opposer à un traitement particulier"
      },
      {
        "title": "6. Cookies et Tracking",
        "body": "• Pas de cookies de suivi publicitaires\n• Cookies techniques essentiels uniquement\n• Pas de partage avec réseaux sociaux\n• Pas de profilage comportemental"
      },
      {
        "title": "7. Suppression de Compte",
        "body": "• Vous pouvez supprimer votre compte à tout moment depuis les Réglages\n• La suppression retire votre profil et vos données d'utilisation de notre base\n• Certains journaux techniques peuvent être brièvement conservés pour la sécurité et la lutte contre la fraude\n• Pour toute question sur une suppression, contactez-nous"
      },
      {
        "title": "8. Contact",
        "body": "Pour toute question concernant votre vie privée:\nEmail: contact@hosmateai.com\nSite: hostmateai.app\nNous répondons dans les 7 jours ouvrables"
      },
      {
        "title": "9. Modifications",
        "body": "Nous pouvons mettre à jour cette politique. Les modifications importantes seront communiquées par email. La date de dernière mise à jour: Août 2026"
      }
    ],
    "en": [
      {
        "title": "Introduction",
        "body": "Welcome to HostMate AI. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and protect your information."
      },
      {
        "title": "1. Data Collected",
        "body": "• Account info: name, email, password (encrypted)\n• Property info: addresses, photos, descriptions\n• Guest data: names, stay dates, contact details\n• Notification and message history\n• Usage metadata: access logs, in-app interactions"
      },
      {
        "title": "2. Data Usage",
        "body": "• Provide and improve our services\n• Send mission reminder notifications\n• Analyze app performance\n• Prevent fraud and abuse\n• Meet legal obligations"
      },
      {
        "title": "3. Security",
        "body": "• SSL/TLS encryption for all communications\n• Secure storage with Supabase (PostgreSQL, with row-level security: your data is never visible to another host)\n• Secure authentication via Supabase (email/password or Google)\n• Limited data access (only your own data)\n• Error tracking via Firebase Crashlytics to fix bugs quickly"
      },
      {
        "title": "4. Data Sharing",
        "body": "• Your data is NEVER sold, and never used for advertising\n• Hosting and database: Supabase\n• AI message generation: Anthropic (Claude), Google (Gemini), OpenRouter, Groq — receive the information needed to draft a message (name, dates, notes, access code, WiFi password)\n• Email delivery: Resend\n• Notifications and technical diagnostics: Firebase (Google)\n• Payments and subscriptions: RevenueCat\n• Maps and address search: OpenStreetMap\n• Each provider only accesses the data needed for its function"
      },
      {
        "title": "5. Your Rights (GDPR)",
        "body": "• Right of access: request a copy of your data\n• Right to rectification: update your information in the app or by contacting us\n• Right to erasure: delete your account any time from Settings\n• Right to portability: contact us to receive your data in a usable format\n• Right to object: contact us to object to a specific use of your data"
      },
      {
        "title": "6. Cookies and Tracking",
        "body": "• No advertising tracking cookies\n• Only essential technical cookies\n• No social network sharing\n• No behavioral profiling"
      },
      {
        "title": "7. Account Deletion",
        "body": "• You can delete your account at any time from Settings\n• Deletion removes your profile and usage data from our database\n• Some technical logs may be briefly kept for security and fraud prevention\n• Contact us with any question about a deletion"
      },
      {
        "title": "8. Contact",
        "body": "For any question about your privacy:\nEmail: contact@hosmateai.com\nSite: hostmateai.app\nWe reply within 7 business days"
      },
      {
        "title": "9. Updates",
        "body": "We may update this policy. Important changes will be communicated by email. Last update: August 2026"
      }
    ],
    "es": [
      {
        "title": "Introducción",
        "body": "Bienvenido a HostMate AI. Respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Esta política de privacidad explica cómo recopilamos, usamos y protegemos tu información."
      },
      {
        "title": "1. Datos recopilados",
        "body": "• Información de cuenta: nombre, email, contraseña (cifrada)\n• Información de propiedades: direcciones, fotos, descripciones\n• Datos de huéspedes: nombres, fechas de estancia, contactos\n• Historial de notificaciones y mensajes\n• Metadatos de uso: registros de acceso, interacciones en la app"
      },
      {
        "title": "2. Uso de datos",
        "body": "• Proveer y mejorar nuestros servicios\n• Enviar recordatorios de misiones\n• Analizar el rendimiento de la app\n• Prevenir fraudes y abusos\n• Cumplir obligaciones legales"
      },
      {
        "title": "3. Seguridad",
        "body": "• Cifrado SSL/TLS en todas las comunicaciones\n• Almacenamiento seguro con Supabase (PostgreSQL, con seguridad a nivel de fila: tus datos nunca son visibles para otro anfitrión)\n• Autenticación segura vía Supabase (email/contraseña o Google)\n• Acceso limitado a los datos (solo los tuyos)\n• Seguimiento de errores vía Firebase Crashlytics para corregir fallos rápidamente"
      },
      {
        "title": "4. Compartición de datos",
        "body": "• Tus datos NUNCA se venden, ni se usan con fines publicitarios\n• Alojamiento y base de datos: Supabase\n• Generación de mensajes con IA: Anthropic (Claude), Google (Gemini), OpenRouter, Groq — reciben la información necesaria para redactar un mensaje (nombre, fechas, notas, código de acceso, contraseña WiFi)\n• Envío de emails: Resend\n• Notificaciones y diagnóstico técnico: Firebase (Google)\n• Pagos y suscripciones: RevenueCat\n• Mapas y búsqueda de direcciones: OpenStreetMap\n• Cada proveedor accede solo a los datos necesarios para su función"
      },
      {
        "title": "5. Tus derechos (RGPD)",
        "body": "• Derecho de acceso: solicita una copia de tus datos\n• Derecho de rectificación: actualiza tu información en la app o contactándonos\n• Derecho al olvido: elimina tu cuenta en cualquier momento desde Ajustes\n• Derecho a la portabilidad: contáctanos para recibir tus datos en un formato utilizable\n• Derecho de oposición: contáctanos para oponerte a un uso concreto de tus datos"
      },
      {
        "title": "6. Cookies y tracking",
        "body": "• Sin cookies publicitarias\n• Solo cookies técnicas esenciales\n• Sin compartir con redes sociales\n• Sin perfilado conductual"
      },
      {
        "title": "7. Eliminación de cuenta",
        "body": "• Puedes eliminar tu cuenta en cualquier momento desde Ajustes\n• La eliminación borra tu perfil y datos de uso de nuestra base de datos\n• Algunos registros técnicos pueden conservarse brevemente por seguridad y prevención de fraude\n• Contáctanos si tienes alguna duda sobre una eliminación"
      },
      {
        "title": "8. Contacto",
        "body": "Para cualquier duda sobre tu privacidad:\nEmail: contact@hosmateai.com\nSitio: hostmateai.app\nRespondemos en un plazo de 7 días hábiles"
      },
      {
        "title": "9. Cambios",
        "body": "Podemos actualizar esta política. Los cambios importantes se comunicarán por email. Última actualización: Agosto 2026"
      }
    ],
    "it": [
      {
        "title": "Introduzione",
        "body": "Benvenuto in HostMate AI. Rispettiamo la tua privacy e ci impegniamo a proteggere i tuoi dati personali. Questa informativa spiega come raccogliamo, usiamo e proteggiamo le tue informazioni."
      },
      {
        "title": "1. Dati raccolti",
        "body": "• Informazioni account: nome, email, password (cifrata)\n• Informazioni proprietà: indirizzi, foto, descrizioni\n• Dati ospiti: nomi, date di soggiorno, contatti\n• Storico notifiche e messaggi\n• Metadati d'uso: log di accesso, interazioni in app"
      },
      {
        "title": "2. Uso dei dati",
        "body": "• Fornire e migliorare i servizi\n• Inviare promemoria delle missioni\n• Analizzare le prestazioni dell'app\n• Prevenire frodi e abusi\n• Rispettare obblighi legali"
      },
      {
        "title": "3. Sicurezza",
        "body": "• Crittografia SSL/TLS per tutte le comunicazioni\n• Archiviazione sicura con Supabase (PostgreSQL, con sicurezza a livello di riga: i tuoi dati non sono mai visibili ad un altro host)\n• Autenticazione sicura tramite Supabase (email/password o Google)\n• Accesso limitato ai dati (solo i tuoi)\n• Monitoraggio errori tramite Firebase Crashlytics per correggere i bug rapidamente"
      },
      {
        "title": "4. Condivisione dei dati",
        "body": "• I tuoi dati NON vengono mai venduti, né usati a scopo pubblicitario\n• Hosting e database: Supabase\n• Generazione messaggi IA: Anthropic (Claude), Google (Gemini), OpenRouter, Groq — ricevono le informazioni necessarie per scrivere un messaggio (nome, date, note, codice d'accesso, password WiFi)\n• Invio email: Resend\n• Notifiche e diagnostica tecnica: Firebase (Google)\n• Pagamenti e abbonamenti: RevenueCat\n• Mappe e ricerca indirizzi: OpenStreetMap\n• Ogni fornitore accede solo ai dati necessari alla propria funzione"
      },
      {
        "title": "5. I tuoi diritti (GDPR)",
        "body": "• Diritto di accesso: richiedi una copia dei tuoi dati\n• Diritto di rettifica: aggiorna le tue informazioni nell'app o contattandoci\n• Diritto all'oblio: elimina il tuo account in qualsiasi momento dalle Impostazioni\n• Diritto alla portabilità: contattaci per ricevere i tuoi dati in un formato utilizzabile\n• Diritto di opposizione: contattaci per opporti a un trattamento specifico"
      },
      {
        "title": "6. Cookie e tracking",
        "body": "• Nessun cookie pubblicitario\n• Solo cookie tecnici essenziali\n• Nessuna condivisione con social network\n• Nessuna profilazione comportamentale"
      },
      {
        "title": "7. Eliminazione account",
        "body": "• Puoi eliminare il tuo account in qualsiasi momento dalle Impostazioni\n• L'eliminazione rimuove il tuo profilo e i dati di utilizzo dal nostro database\n• Alcuni log tecnici possono essere conservati brevemente per sicurezza e prevenzione frodi\n• Contattaci per qualsiasi domanda su una cancellazione"
      },
      {
        "title": "8. Contatto",
        "body": "Per qualsiasi domanda sulla tua privacy:\nEmail: contact@hosmateai.com\nSito: hostmateai.app\nRispondiamo entro 7 giorni lavorativi"
      },
      {
        "title": "9. Modifiche",
        "body": "Possiamo aggiornare questa politica. Le modifiche importanti saranno comunicate via email. Ultimo aggiornamento: Agosto 2026"
      }
    ]
  },
  "terms": {
    "fr": [
      {
        "title": "Introduction",
        "body": "Bienvenue sur HostMate AI. En accédant et en utilisant cette application, vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service."
      },
      {
        "title": "1. Services Fournis",
        "body": "• Plateforme de gestion des propriétés et des clients\n• Notifications automatiques et rappels\n• Assistants IA pour communication\n• Analytics et statistiques\n• Les services peuvent être modifiés ou arrêtés"
      },
      {
        "title": "2. Responsabilités de l'Utilisateur",
        "body": "• Vous êtes responsable de vos identifiants de connexion\n• Vous devez utiliser le service légalement et légitimement\n• Interdiction de harceler, menacer ou discriminer\n• Interdiction d'accéder aux données d'autres utilisateurs\n• Interdiction de violer les lois applicables"
      },
      {
        "title": "3. Contenu et Propriété Intellectuelle",
        "body": "• Vous conservez tous les droits sur votre contenu\n• Vous nous accordez le droit d'utiliser votre contenu pour fournir le service\n• Notre service, design et code source sont protégés\n• Vous ne pouvez pas reproduire ou distribuer notre plateforme"
      },
      {
        "title": "4. Limitation de Responsabilité",
        "body": "• HostMate AI est fourni \"tel quel\" sans garantie\n• Nous ne sommes pas responsables des dégâts indirects ou pertes\n• Responsabilité maximale: montant payé pour l'abonnement (30 jours)\n• Vous utilisez le service à vos risques et périls"
      },
      {
        "title": "5. Plans de Tarification",
        "body": "• GRATUIT : 1 logement, 5 messages IA par mois, 1 rappel actif (24h avant l'arrivée), 1 résolution de conflit par mois — sans livret d'accueil publié, sans traduction miroir, sans automatisation email, sans rapport IA complet, sans pilote automatique, sans création de logement par IA\n• PRO (14,99$/mois) : jusqu'à 5 logements, 400 messages IA par mois, 60 résolutions de conflit par mois, rappels illimités (24h/12h/6h/4h/2h), un livret d'accueil publié par logement, traduction miroir, automatisation email, rapport IA complet, pilote automatique, création de logement par IA, alertes d'arrivée jusqu'à 2h avant, support prioritaire\n• Les plafonds mensuels du plan PRO sont des garde-fous contre les usages automatisés : ils représentent environ trois fois l'usage d'un hôte gérant cinq logements. Au-delà de 5 logements, écrivez-nous — nous étudions chaque situation au cas par cas.\n• Offre de lancement : un tarif réduit à 9,99$/mois peut être proposé aux premiers utilisateurs, dans la limite des places disponibles et pour une durée limitée\n• Les paiements effectués depuis l'application mobile sont gérés par l'App Store ou Google Play (via RevenueCat) ; ceux effectués depuis le web sont gérés par Lemon Squeezy, vendeur légal de la transaction. HostMate AI ne stocke jamais vos informations bancaires."
      },
      {
        "title": "6. Annulation et Remboursement",
        "body": "• Abonnement : annulable à tout moment depuis les réglages de votre compte App Store/Google Play, reste actif jusqu'à la fin de la période payée\n• Remboursements : gérés selon la politique de l'App Store ou de Google Play, pas directement par HostMate AI\n• Droit de rétractation : 14 jours pour les nouveaux abonnés dans l'UE/EEE, selon les modalités de la plateforme de paiement"
      },
      {
        "title": "7. Modifications du Service",
        "body": "• Nous pouvons ajouter, modifier ou supprimer des fonctionnalités\n• Les changements majeurs seront annoncés avec préavis\n• L'accès peut être interrompu ou suspendu sans responsabilité"
      },
      {
        "title": "8. Violation des Conditions",
        "body": "• Nous pouvons suspendre ou terminer votre compte\n• Suspension pour violations graves: fraude, harcèlement, contenus illégaux\n• Vous pouvez contester un bannissement\n• Perte d'accès aux données après suppression"
      },
      {
        "title": "9. Loi Applicable",
        "body": "• Ces conditions sont régies par le droit sénégalais\n• Juridiction: tribunaux compétents du Sénégal en cas de litige\n• En cas de litige: tentative de résolution amiable d'abord\n• Médiation possible avant action en justice"
      },
      {
        "title": "10. Contact et Support",
        "body": "Pour toute question concernant ces conditions:\nEmail: support@hosmateai.com\nSite: hostmateai.app\nNous répondons dans les 7 jours ouvrables"
      },
      {
        "title": "11. Modifications des Conditions",
        "body": "Nous nous réservons le droit de modifier ces conditions.\nLes modifications seront annoncées par email.\nContinuation d'utilisation = acceptation des nouvelles conditions.\nDernière mise à jour: Août 2026"
      }
    ],
    "en": [
      {
        "title": "Introduction",
        "body": "Welcome to HostMate AI. By accessing and using this application, you agree to these terms of service. If you do not accept them, please do not use our service."
      },
      {
        "title": "1. Services Provided",
        "body": "• Property and guest management platform\n• Automated notifications and reminders\n• AI assistants for communication\n• Analytics and statistics\n• Services may be modified or discontinued"
      },
      {
        "title": "2. User Responsibilities",
        "body": "• You are responsible for your login credentials\n• You must use the service legally\n• No harassment, threats, or discrimination\n• No access to other users' data\n• No violation of applicable laws"
      },
      {
        "title": "3. Content and Intellectual Property",
        "body": "• You keep all rights to your content\n• You grant us the right to use your content to provide the service\n• Our service, design, and code are protected\n• You may not reproduce or distribute our platform"
      },
      {
        "title": "4. Limitation of Liability",
        "body": "• HostMate AI is provided \"as is\" without warranty\n• We are not liable for indirect damages or losses\n• Maximum liability: amount paid for the subscription (30 days)\n• Use the service at your own risk"
      },
      {
        "title": "5. Pricing Plans",
        "body": "• FREE: 1 property, 5 AI messages per month, 1 active reminder (24h before arrival), 1 conflict resolution per month — no published welcome book, no mirror translation, no email automation, no full AI report, no autopilot, no AI property creation\n• PRO ($14.99/month): up to 5 properties, 400 AI messages per month, 60 conflict resolutions per month, unlimited reminders (24h/12h/6h/4h/2h), one published welcome book per property, mirror translation, email automation, full AI report, autopilot, AI property creation, arrival alerts as late as 2h before, priority support\n• The PRO monthly caps are safeguards against automated usage: they are roughly three times what a host managing five properties uses. Beyond 5 properties, get in touch — we look at each situation individually.\n• Launch offer: a discounted $9.99/month rate may be available to early users, while spots last and for a limited time\n• Payments made from the mobile app are handled by the App Store or Google Play (via RevenueCat); payments made on the web are handled by Lemon Squeezy, the legal seller of record for that transaction. HostMate AI never stores your card details."
      },
      {
        "title": "6. Cancellation and Refunds",
        "body": "• Subscription: cancel anytime from your App Store/Google Play account settings, remains active until the end of the paid period\n• Refunds: handled per the App Store or Google Play refund policy, not directly by HostMate AI\n• Withdrawal right: 14 days for new EU/EEA subscribers, subject to the payment platform's own process"
      },
      {
        "title": "7. Service Changes",
        "body": "• We may add, modify, or remove features\n• Major changes will be announced in advance\n• Access may be interrupted or suspended without liability"
      },
      {
        "title": "8. Terms Violations",
        "body": "• We may suspend or terminate your account\n• Suspension for serious violations: fraud, harassment, illegal content\n• You can appeal a ban\n• Loss of data access after deletion"
      },
      {
        "title": "9. Applicable Law",
        "body": "• These terms are governed by the laws of Senegal\n• Jurisdiction: competent courts of Senegal for any dispute\n• Disputes: attempt amicable resolution first\n• Mediation possible before legal action"
      },
      {
        "title": "10. Contact and Support",
        "body": "For any question about these terms:\nEmail: support@hosmateai.com\nSite: hostmateai.app\nWe reply within 7 business days"
      },
      {
        "title": "11. Terms Updates",
        "body": "We reserve the right to update these terms.\nChanges will be announced by email.\nContinued use = acceptance of new terms.\nLast update: August 2026"
      }
    ],
    "es": [
      {
        "title": "Introducción",
        "body": "Bienvenido a HostMate AI. Al acceder y usar esta aplicación, aceptas estos términos de servicio. Si no los aceptas, no uses el servicio."
      },
      {
        "title": "1. Servicios proporcionados",
        "body": "• Plataforma de gestión de propiedades y huéspedes\n• Notificaciones y recordatorios automáticos\n• Asistentes de IA para comunicación\n• Analíticas y estadísticas\n• Los servicios pueden modificarse o detenerse"
      },
      {
        "title": "2. Responsabilidades del usuario",
        "body": "• Eres responsable de tus credenciales\n• Debes usar el servicio legalmente\n• Prohibido acosar, amenazar o discriminar\n• Prohibido acceder a datos de otros usuarios\n• Prohibido violar leyes aplicables"
      },
      {
        "title": "3. Contenido y propiedad intelectual",
        "body": "• Conservas todos los derechos sobre tu contenido\n• Nos concedes el derecho de usar tu contenido para brindar el servicio\n• Nuestro servicio, diseño y código están protegidos\n• No puedes reproducir o distribuir la plataforma"
      },
      {
        "title": "4. Limitación de responsabilidad",
        "body": "• HostMate AI se proporciona \"tal cual\" sin garantía\n• No somos responsables de daños indirectos o pérdidas\n• Responsabilidad máxima: monto pagado por la suscripción (30 días)\n• Usas el servicio bajo tu propio riesgo"
      },
      {
        "title": "5. Planes de precios",
        "body": "• GRATIS: 1 alojamiento, 5 mensajes IA al mes, 1 recordatorio activo (24h antes de la llegada), 1 resolución de conflictos al mes — sin guía de bienvenida publicada, sin traducción espejo, sin automatización de email, sin informe IA completo, sin piloto automático, sin creación de alojamiento por IA\n• PRO (14,99$/mes): hasta 5 alojamientos, 400 mensajes IA al mes, 60 resoluciones de conflictos al mes, recordatorios ilimitados (24h/12h/6h/4h/2h), una guía de bienvenida publicada por alojamiento, traducción espejo, automatización de email, informe IA completo, piloto automático, creación de alojamiento por IA, alertas de llegada hasta 2h antes, soporte prioritario\n• Los límites mensuales del plan PRO son salvaguardas frente a usos automatizados: representan unas tres veces el uso de un anfitrión con cinco alojamientos. A partir de 5 alojamientos, escríbenos — estudiamos cada situación caso por caso.\n• Oferta de lanzamiento: puede ofrecerse una tarifa reducida de 9,99$/mes a los primeros usuarios, mientras haya plazas disponibles y por tiempo limitado\n• Los pagos realizados desde la aplicación móvil se gestionan a través de App Store o Google Play (vía RevenueCat); los realizados desde la web se gestionan a través de Lemon Squeezy, vendedor legal de la transacción. HostMate AI nunca almacena los datos de tu tarjeta."
      },
      {
        "title": "6. Cancelación y reembolsos",
        "body": "• Suscripción: cancelable en cualquier momento desde los ajustes de tu cuenta de App Store/Google Play, activa hasta el final del período pagado\n• Reembolsos: gestionados según la política de la App Store o Google Play, no directamente por HostMate AI\n• Derecho de desistimiento: 14 días para nuevos suscriptores UE/EEE, según el proceso propio de la plataforma de pago"
      },
      {
        "title": "7. Cambios del servicio",
        "body": "• Podemos añadir, modificar o eliminar funciones\n• Cambios importantes se anunciarán con antelación\n• El acceso puede interrumpirse o suspenderse sin responsabilidad"
      },
      {
        "title": "8. Violación de términos",
        "body": "• Podemos suspender o terminar tu cuenta\n• Suspensión por violaciones graves: fraude, acoso, contenido ilegal\n• Puedes apelar una sanción\n• Pérdida de acceso a datos tras eliminación"
      },
      {
        "title": "9. Ley aplicable",
        "body": "• Estos términos se rigen por la legislación de Senegal\n• Jurisdicción: tribunales competentes de Senegal en caso de disputa\n• En caso de disputa: intento de solución amistosa primero\n• Mediación posible antes de acción legal"
      },
      {
        "title": "10. Contacto y soporte",
        "body": "Para cualquier duda sobre estas condiciones:\nEmail: support@hosmateai.com\nSitio: hostmateai.app\nRespondemos en un plazo de 7 días hábiles"
      },
      {
        "title": "11. Cambios de términos",
        "body": "Nos reservamos el derecho de modificar estos términos.\nLos cambios se anunciarán por email.\nEl uso continuo = aceptación de los nuevos términos.\nÚltima actualización: Agosto 2026"
      }
    ],
    "it": [
      {
        "title": "Introduzione",
        "body": "Benvenuto in HostMate AI. Accedendo e usando questa applicazione, accetti questi termini di servizio. Se non li accetti, non utilizzare il servizio."
      },
      {
        "title": "1. Servizi forniti",
        "body": "• Piattaforma di gestione proprietà e ospiti\n• Notifiche e promemoria automatici\n• Assistenti IA per comunicazione\n• Analisi e statistiche\n• I servizi possono essere modificati o interrotti"
      },
      {
        "title": "2. Responsabilità dell'utente",
        "body": "• Sei responsabile delle credenziali di accesso\n• Devi usare il servizio legalmente\n• Vietato molestare, minacciare o discriminare\n• Vietato accedere ai dati di altri utenti\n• Vietato violare le leggi applicabili"
      },
      {
        "title": "3. Contenuti e proprietà intellettuale",
        "body": "• Mantieni tutti i diritti sui tuoi contenuti\n• Ci concedi il diritto di usare i contenuti per fornire il servizio\n• Il nostro servizio, design e codice sono protetti\n• Non puoi riprodurre o distribuire la piattaforma"
      },
      {
        "title": "4. Limitazione di responsabilità",
        "body": "• HostMate AI è fornito \"così com'è\" senza garanzie\n• Non siamo responsabili di danni indiretti o perdite\n• Responsabilità massima: importo pagato per l'abbonamento (30 giorni)\n• Usi il servizio a tuo rischio"
      },
      {
        "title": "5. Piani tariffari",
        "body": "• GRATUITO: 1 alloggio, 5 messaggi IA al mese, 1 promemoria attivo (24h prima dell'arrivo), 1 risoluzione di conflitti al mese — senza libretto di benvenuto pubblicato, senza traduzione speculare, senza automazione email, senza report IA completo, senza pilota automatico, senza creazione di alloggio tramite IA\n• PRO (14,99$/mese): fino a 5 alloggi, 400 messaggi IA al mese, 60 risoluzioni di conflitti al mese, promemoria illimitati (24h/12h/6h/4h/2h), un libretto di benvenuto pubblicato per alloggio, traduzione speculare, automazione email, report IA completo, pilota automatico, creazione di alloggio tramite IA, avvisi di arrivo fino a 2h prima, supporto prioritario\n• I limiti mensili del piano PRO sono tutele contro usi automatizzati: rappresentano circa tre volte l'utilizzo di un host con cinque alloggi. Oltre i 5 alloggi, scrivici — valutiamo ogni situazione caso per caso.\n• Offerta di lancio: una tariffa scontata di 9,99$/mese potrebbe essere disponibile per i primi utenti, nei limiti dei posti disponibili e per un periodo limitato\n• I pagamenti effettuati dall'app mobile sono gestiti da App Store o Google Play (tramite RevenueCat); quelli effettuati sul web sono gestiti da Lemon Squeezy, venditore legale della transazione. HostMate AI non memorizza mai i dati della tua carta."
      },
      {
        "title": "6. Cancellazione e rimborsi",
        "body": "• Abbonamento: cancellabile in qualsiasi momento dalle impostazioni del tuo account App Store/Google Play, attivo fino alla fine del periodo pagato\n• Rimborsi: gestiti secondo la politica dell'App Store o di Google Play, non direttamente da HostMate AI\n• Diritto di recesso: 14 giorni per nuovi abbonati UE/SEE, secondo il processo della piattaforma di pagamento"
      },
      {
        "title": "7. Modifiche del servizio",
        "body": "• Possiamo aggiungere, modificare o rimuovere funzionalità\n• Cambiamenti importanti saranno comunicati in anticipo\n• L'accesso può essere interrotto o sospeso senza responsabilità"
      },
      {
        "title": "8. Violazione dei termini",
        "body": "• Possiamo sospendere o terminare l'account\n• Sospensione per violazioni gravi: frode, molestie, contenuti illegali\n• Puoi contestare un ban\n• Perdita di accesso ai dati dopo eliminazione"
      },
      {
        "title": "9. Legge applicabile",
        "body": "• Questi termini sono regolati dalla legge del Senegal\n• Giurisdizione: tribunali competenti del Senegal in caso di controversia\n• In caso di disputa: tentativo di risoluzione amichevole prima\n• Mediazione possibile prima di azione legale"
      },
      {
        "title": "10. Contatto e supporto",
        "body": "Per qualsiasi domanda su queste condizioni:\nEmail: support@hosmateai.com\nSito: hostmateai.app\nRispondiamo entro 7 giorni lavorativi"
      },
      {
        "title": "11. Modifiche ai termini",
        "body": "Ci riserviamo il diritto di modificare questi termini.\nLe modifiche saranno annunciate via email.\nUso continuato = accettazione dei nuovi termini.\nUltimo aggiornamento: Agosto 2026"
      }
    ]
  }
}

const TITRES: Record<Doc, Record<Lang, string>> = {
  "privacy": {
    "fr": "Politique de confidentialité",
    "en": "Privacy Policy",
    "es": "Política de privacidad",
    "it": "Informativa sulla privacy"
  },
  "terms": {
    "fr": "Conditions d'utilisation",
    "en": "Terms of Service",
    "es": "Condiciones de uso",
    "it": "Condizioni di utilizzo"
  }
}

const RETOUR: Record<Lang, string> = {
  "fr": "Retour à l'accueil",
  "en": "Back to home",
  "es": "Volver al inicio",
  "it": "Torna alla home"
}

export default function LegalPage({ doc, lang }: { doc: Doc; lang: Lang }) {
  const titre = TITRES[doc][lang]

  // Le titre de l'onglet sert aussi de reference quand Google indexe la page.
  useEffect(() => {
    document.title = `${titre} — HostMate AI`
  }, [titre])

  return (
    <main className="mx-auto max-w-2xl px-5 py-14">
      <Link
        to={lang === 'en' ? '/' : `/${lang}`}
        className="text-sm text-hostmate-primary hover:underline"
      >
        ← {RETOUR[lang]}
      </Link>

      <h1 className="font-display text-3xl font-semibold text-hostmate-ink mt-6 mb-10">
        {titre}
      </h1>

      {CONTENU[doc][lang].map((s) => (
        <section key={s.title} className="mb-9">
          <h2 className="font-display text-lg font-semibold text-hostmate-ink mb-2">
            {s.title}
          </h2>
          {/* whitespace-pre-line : les textes portent leurs propres sauts de
              ligne et leurs puces, tels qu'ils sont ecrits dans l'application. */}
          <p className="text-sm leading-relaxed text-hostmate-textGrey whitespace-pre-line">
            {s.body}
          </p>
        </section>
      ))}
    </main>
  )
}
