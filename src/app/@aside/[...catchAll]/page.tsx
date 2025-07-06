import { LayoutAside } from 'src/components/LayoutAside';

/**
 * Default Aside Slot - Fallback padrão para o slot @aside
 *
 * Este componente serve como fallback padrão para o parallel route @aside.
 * É renderizado quando não há um aside específico definido para a rota atual.
 *
 * Utiliza o LayoutAside padrão que contém:
 * - E-book em destaque (conversão principal)
 * - Quem é a Lets (credibilidade/autoridade)
 * - Categorias (navegação relacionada)
 *
 * Seguindo as Laws of UX implementadas:
 * - Cognitive Load: Máximo 3 seções essenciais
 * - Conversion Strategy: E-book no topo para conversão
 * - Miller's Law: Máximo 7 categorias visíveis
 * - Fitts's Law: CTAs touch-friendly (44px+)
 *
 * @returns JSX.Element - LayoutAside padrão
 */
export default LayoutAside;
