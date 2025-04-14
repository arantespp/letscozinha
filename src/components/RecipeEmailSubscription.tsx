'use client';

import { EmailSubscription } from './EmailSubscription';

/**
 * Component for subscribing to the newsletter using Monklis on recipe pages
 */
export function RecipeEmailSubscription() {
  return (
    <EmailSubscription
      title="Receba as melhores receitas"
      description="Inscreva-se para receber novas receitas e dicas culinárias diretamente no seu e-mail."
      containerClassName="bg-gradient-to-br from-primary/10 to-accent/10 p-md rounded-lg shadow-sm w-full"
      formLayout="column"
      textAlignment="left"
      marginClassName="mt-sm mb-lg md:my-lg"
    />
  );
}
