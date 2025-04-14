import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "../../ai";
import { HfInference } from "npm:@huggingface/inference";
function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [recipeShown, SetIsRecipeShown] = React.useState(false);
  const [recipe, setRecipe] = React.useState([]);

  const ingredientListItems = ingredients.map((item) => (
    <li key={item}>{item}</li>
  ));

  function toggleShown() {
    SetIsRecipeShown((prevState) => !prevState);
    getRecipe();
  }

  async function getRecipe() {
    const response = await getRecipeFromMistral(ingredients);
    setRecipe(response);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const ingredient = formData.get("ingredient");
    console.log(ingredient);
    setIngredients(() => [...ingredients, ingredient]);
    formEl.reset();
  }

  return (
    <main class="px-30 py-30">
      <form
        class="mt-34 flex items-center justify-center"
        onSubmit={handleSubmit}
      >
        <input
          class="border-1 w-144 w-4 p-4 border-gray-400 rounded-sm bg-white focus:border-blue-500 focus:bg-blue-200 "
          type="text"
          placeholder="oregano etc."
          name="ingredient"
        />
        <button class="bg-black text-white p-2 rounded-lg ml-16">
          + Add Ingredient
        </button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList
          ingredientListItems={ingredientListItems}
          toggleShown={toggleShown}
          ingredients={ingredients}
        />
      )}
      {recipeShown && <ClaudeRecipe getRecipe={getRecipe} recipe={recipe} />}
    </main>
  );
}

export default Main;
