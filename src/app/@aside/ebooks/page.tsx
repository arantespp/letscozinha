import { LayoutAside } from 'src/components/LayoutAside';

/**
 * Aside específico para página de E-books (/ebooks)
 *
 * Baseado no LayoutAside padrão, mas SEM o ShowFeaturedEbook para evitar
 * competição na página comercial dedicada a e-books.
 *
 * Usa a mesma estrutura e estilos do LayoutAside, mantendo consistência:
 * - Newsletter específica para e-books (substitui featured ebook)
 * - Quem é a Lets (credibilidade/autoridade)
 * - Categorias (navegação para receitas)
 *
 * Seguindo as Laws of UX:
 * - Cognitive Load: Reduzido para 3 seções essenciais
 * - No Choice Overload: Remove e-books do aside para não competir com o conteúdo principal
 * - Authority/Credibility: Mantém seção "Quem é a Lets"
 * - Navigation: Categorias para explorar receitas relacionadas
 *
 * @returns JSX.Element - Aside otimizado para página de e-books baseado no LayoutAside
 */
export default function EbooksAside() {
  return (
    <LayoutAside
      sections={{
        featuredEbook: false,
        whoIsLets: true,
        categories: true,
        newsletter: {
          title: 'Novidades de E-books',
          description:
            'Receba avisos sobre novos lançamentos e ofertas especiais dos nossos e-books.',
          formLayout: 'column',
          textAlignment: 'center',
        },
      }}
    />
  );
}
