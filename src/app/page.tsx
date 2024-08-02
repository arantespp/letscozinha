import { RecipesList } from 'src/components/RecipesList';
import { getLetsCozinha } from 'src/cms/singleTypes';

export default async function Home() {
  const { letsCozinha } = await getLetsCozinha();

  return (
    <div className="flex flex-col gap-md md:gap-lg flex-1">
      <section>
        <div>
          <h2>Receitas Favoritas</h2>
          <RecipesList recipes={letsCozinha.receitas_favoritas} />
        </div>
      </section>
    </div>
  );
}
