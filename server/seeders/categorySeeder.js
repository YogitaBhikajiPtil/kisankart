const { Category } = require("../models");

const categories = [

    {
        name: "Vegetables",
        description: "Fresh vegetables"
    },

    {
        name: "Fruits",
        description: "Fresh fruits"
    },

    {
        name: "Grains",
        description: "Rice, wheat and other grains"
    },

    {
        name: "Dairy",
        description: "Milk and dairy products"
    },

    {
        name: "Spices",
        description: "Natural spices"
    },

    {
        name: "Flowers",
        description: "Fresh flowers"
    },

    {
        name: "Organic",
        description: "Organic farm products"
    },

    {
        name: "Others",
        description: "Other farm products"
    }

];

async function seedCategories() {

    try {

        for (const category of categories) {

            const existingCategory = await Category.findOne({

                where: {
                    name: category.name
                }

            });

            if (!existingCategory) {

                await Category.create(category);

            }

        }

        console.log("Categories seeded successfully.");

        process.exit();

    } catch (error) {

        console.error(error);

        process.exit(1);

    }

}

seedCategories();