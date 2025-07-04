import { EmailSubscription } from './EmailSubscription';

/**
 * Client component for the newsletter subscription in the footer
 */
export function FooterNewsletterSection() {
  return (
    <EmailSubscription
      title="Receba Nossas Novidades"
      description="Cadastre seu email para receber nossas receitas e dicas culinárias."
      formLayout="row"
      textAlignment="center"
    />
  );
}
