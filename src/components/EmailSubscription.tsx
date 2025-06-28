'use client';

import * as React from 'react';
import { Card } from './Card';

type EmailSubscriptionProps = {
  /** Title to display above the subscription form */
  title?: string;
  /** Description to display below the title */
  description?: string;
  /** Layout direction for the form (column or row) */
  formLayout?: 'row' | 'column';
  /** Text alignment for the heading and description */
  textAlignment?: 'center' | 'left';
};

/**
 * Unified email subscription component with encapsulated Card presentation.
 *
 * This component follows the project's encapsulation pattern where visual
 * presentation (Card) is handled internally, not required externally.
 *
 * Features:
 * - Newsletter signup with API integration
 * - Responsive form layout (row/column)
 * - Accessible form controls and error handling
 * - Touch-friendly CTAs (44px+ following Fitts's Law)
 * - Single responsibility: email subscription conversion
 *
 * @example
 * ```tsx
 * // Basic usage
 * <EmailSubscription />
 *
 * // Customized for specific context
 * <EmailSubscription
 *   title="Receba Receitas Especiais"
 *   formLayout="row"
 *   textAlignment="center"
 * />
 * ```
 */
export function EmailSubscription({
  title = 'Receba Nossas Novidades',
  description = 'Cadastre seu email para receber nossas receitas e dicas culinárias.',
  formLayout = 'column',
  textAlignment = 'left',
}: EmailSubscriptionProps) {
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>(
    'idle'
  );
  const [errorMessage, setErrorMessage] = React.useState('');
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      // Using our own API endpoint that validates the origin and forwards to Listmonk
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMessage(
          data.error || 'Houve um erro ao processar sua inscrição.'
        );
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        'Houve um problema de conexão. Por favor, tente novamente mais tarde.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const textAlignmentClass =
    textAlignment === 'center' ? 'text-center' : 'text-left';
  // Always start with flex-col, apply sm:flex-row only if formLayout is 'row'
  const formLayoutClass =
    formLayout === 'row' ? 'flex-col sm:flex-row' : 'flex-col';

  return (
    <Card variant="newsletter">
      <h3 className={`font-heading text-lg mb-sm ${textAlignmentClass}`}>
        {title}
      </h3>
      <p className={`text-sm text-text-light mb-md ${textAlignmentClass}`}>
        {description}
      </p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={`flex ${formLayoutClass} gap-sm w-full`}
      >
        <input
          type="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-md py-sm border border-gray-300 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-primary/50"
          disabled={isSubmitting}
          aria-label="Endereço de email para newsletter"
        />

        <button
          type="submit"
          className="bg-primary hover:bg-primary/80 text-text-dark px-md py-sm rounded-md font-medium transition-colors whitespace-nowrap min-h-[44px] min-w-[120px]"
          disabled={isSubmitting}
          aria-label={
            isSubmitting ? 'Processando inscrição' : 'Inscrever na newsletter'
          }
        >
          {isSubmitting ? 'Inscrevendo...' : 'Inscrever'}
        </button>
      </form>

      {status === 'success' && (
        <p
          className={`text-text-success text-sm mt-xs ${textAlignmentClass}`}
          role="status"
          aria-live="polite"
        >
          Obrigado por se inscrever! Você receberá novidades e receitas
          diretamente no seu e-mail.
        </p>
      )}
      {status === 'error' && (
        <p
          className={`text-text-error text-sm mt-xs ${textAlignmentClass}`}
          role="alert"
          aria-live="assertive"
        >
          {errorMessage ||
            'Houve um erro. Por favor, tente novamente mais tarde.'}
        </p>
      )}
    </Card>
  );
}
