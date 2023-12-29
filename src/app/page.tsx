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
import { Menu } from "@/types/menus";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const [selectedMeal, setSelectedMeal] = useState<Menu>({});
  const [shoppingList, setShoppingList] = useState<Set<string>>(new Set());

  const handleAddMealToShoppingList = () => {
    setShoppingList((prevShoppingList) => {
      const values = Object.values(selectedMeal);
      const newItems = values.filter((item) => !prevShoppingList.has(item));
      return new Set<string>([...prevShoppingList, ...newItems]);
    });
  };

  const handleSelectRandomMeal = () => {
    const randomIndex = Math.floor(Math.random() * menus.length);
    const randomMeal = menus[randomIndex];

    setSelectedMeal(randomMeal);
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
              <Label>Salada: {selectedMeal?.salad}</Label>
              <Label>Carboidrato: {selectedMeal?.carbo}</Label>
              <Label>Fruta: {selectedMeal?.fruit}</Label>
              <Label>Grão: {selectedMeal?.grain}</Label>
              <Label>Proteína: {selectedMeal?.protein}</Label>
              <Label>Vegetal: {selectedMeal?.vegetable}</Label>
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
