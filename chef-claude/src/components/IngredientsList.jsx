import React from "react";

function IngredientsList(props) {
  return (
    <div>
      <section class="mt-24">
        <h2 class="font-bold text-2xl ">Ingredients on hand :</h2>
        <ul class="justify-center items-center m-6 list-disc flex-1 mb-24 leading-8">
          {props.ingredientListItems}
        </ul>

        {props.ingredients.length > 3 && (
          <div class="bg-gray-100 p-4 flex  justify-between">
            <div>
              <h3 class="text-xl font-bold">Ready for a Recipe?</h3>

              <p class="text-sm text-stone-500 leading-16">
                Generate a recipe from your List
              </p>
            </div>
            <button
              onClick={props.toggleShown}
              class="flex items-center justify-center cursor-pointer bg-orange-400 rounded-lg w-32 h-16"
            >
              Get Recipe
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default IngredientsList;
