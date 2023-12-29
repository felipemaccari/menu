"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { menus } from "@/data/menus";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Menu = {
  [key: string]: {
    title: string;
    ingredients: string[];
  };
};

export default function Home() {
  const [selectedMeal, setSelectedMeal] = useState<Menu>({});
  const [shoppingList, setShoppingList] = useState<Set<string>>(new Set());

  const handleAddMealToShoppingList = () => {
    setShoppingList((prevShoppingList) => {
      const keys = Object.keys(selectedMeal);
      let values: string[] = [];

      for (const key of keys) {
        if (selectedMeal[key].ingredients.length > 0) {
          values.push(...selectedMeal[key].ingredients);
        }

        values.push(selectedMeal[key].title);
      }

      return new Set<string>([...prevShoppingList, ...values]);

      // const values = Object.values(selectedMeal);

      // const newItems = values.filter((item) => !prevShoppingList.has(item));

      // console.log(newItems);

      // return new Set<string>([...prevShoppingList, ...newItems]);
    });
  };

  const handleSelectRandomMeal = () => {
    const randomIndex = Math.floor(Math.random() * menus.length);
    const randomMeal = menus[randomIndex];

    setSelectedMeal(randomMeal as Menu);
  };

  return (
    <main>
      <div className="flex items-center justify-center py-5">
        <Button onClick={handleSelectRandomMeal}>Refeição Aleatória</Button>
      </div>

      <div className="flex justify-evenly">
        <div>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Refeição</CardTitle>
              <CardDescription>Ingredientes e tals</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-2">
              <Label>Salada: {selectedMeal?.salad?.title}</Label>
              <Label>Carboidrato: {selectedMeal?.carbo?.title}</Label>
              <Label>Fruta: {selectedMeal?.fruit?.title}</Label>
              <Label>Grão: {selectedMeal?.grain?.title}</Label>
              <Label>Proteína: {selectedMeal?.protein?.title}</Label>
              <Label>Vegetal: {selectedMeal?.vegetable?.title}</Label>
            </CardContent>

            <CardFooter>
              <Button onClick={handleAddMealToShoppingList}>
                Adicionar a lista de compras
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Lista de compras</CardTitle>
            <CardDescription>Ingredientes e tals</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-2">
            {Array.from(shoppingList).map((item, index) => {
              return <Label key={index}>{item}</Label>;
            })}
          </CardContent>

          <CardFooter>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button>Enviar no whats</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <a
                    href={`https://api.whatsapp.com/send?phone=5546991344560&text=Lista%20de%20compras%20->%20${Array.from(
                      shoppingList
                    ).join(",%20")}`}
                  >
                    Joyce
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>Felipe</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
