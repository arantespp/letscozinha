import { EmailSubscription } from './EmailSubscription';
import { Card } from './Card';

/**
 * Component for subscribing to the newsletter using Monklis on recipe pages
 *
 * Utiliza o componente Card com background gradiente para destacar a newsletter
 * nas páginas de receitas, seguindo o design system do projeto.
 */
export function RecipeEmailSubscription() {
  return (
    <Card variant="newsletter">
      <EmailSubscription
        title="Receba as melhores receitas"
        description="Inscreva-se para receber novas receitas e dicas culinárias diretamente no seu e-mail."
        containerClassName=""
        formLayout="column"
        textAlignment="left"
        marginClassName="mt-sm mb-lg md:my-lg"
      />
    </Card>
  );
}
