import { getRecipes } from 'src/cms/getRecipes';
import { getRecipe } from 'src/cms/getRecipe';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';
import Image from 'next/image';

export async function generateStaticParams() {
  const { data } = await getRecipes();

  return data.map((recipe) => ({
    slug: recipe.attributes.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const recipe = await getRecipe({ slug: params.slug });

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(recipe.attributes.receita);

  const contentHtml = processedContent.toString();

  const image = recipe.attributes.imagens?.data?.[0]?.attributes.formats?.small;

  return (
    <div className="flex flex-col gap-3">
      <Link href="/" className="underline">
        Home
      </Link>
      <h1>{recipe.attributes.nome}</h1>
      {image && (
        <Image
          src={image.url}
          width={image.width}
          height={image.height}
          alt=""
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
