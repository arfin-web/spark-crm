"use client";

import {
  Search,
  Bell,
  Menu,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/95 backdrop-blur px-4 md:px-6">
      <div className="flex items-center gap-4 w-full max-w-xl">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <div className="relative w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leads, projects..."
            className="pl-10 bg-muted/50 border-none h-10 w-full max-w-sm rounded-xl focus-visible:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2 rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary transition-all">
          <Plus className="h-4 w-4" />
          Quick Add
        </Button>

        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary border-2 border-background" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://i.pravatar.cc/150?u=agency" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-2" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Arfin Nafriz</p>
                  <p className="text-xs leading-none text-muted-foreground">Pixel Perfect Agency</p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">Profile Settings</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-primary font-medium">Subscription</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
