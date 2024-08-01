import { RecipesList } from 'src/components/RecipesList';
import { getLetsCozinha } from 'src/cms/singleTypes';

export default async function Home() {
  const { letsCozinha } = await getLetsCozinha();

  return (
    <div className="flex flex-col gap-md md:gap-lg flex-1">
      <section>
        <h1 className="text-5xl md:text-6xl text-center">Lets Cozinha</h1>
        <p className="text-text-light text-lg md:text-xl text-center">
          Seja bem-vindo ao Lets Cozinha, um site de receitas para você se
          inspirar e cozinhar.
        </p>
      </section>
      <section>
        <div>
          <h2>Receitas Favoritas</h2>
          <RecipesList recipes={letsCozinha.receitas_favoritas} />
        </div>
      </section>
    </div>
  );
}
