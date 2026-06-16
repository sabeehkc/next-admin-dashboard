"use client";

import { useState } from "react";
import MasterLayout from "./master-layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function CategoryMaster() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Consultancy Fee", type: "INCOME", status: "ACTIVE" },
    { id: 2, name: "Office Rent", type: "EXPENSE", status: "ACTIVE" },
    { id: 3, name: "Travel Allowance", type: "EXPENSE", status: "ACTIVE" },
    { id: 4, name: "Software Subscription", type: "EXPENSE", status: "INACTIVE" },
  ]);

  const [formData, setFormData] = useState<{ name: string; type: "EXPENSE" | "INCOME" | string }>({ name: "", type: "EXPENSE" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEdit = (category: any) => {
    setEditingId(category.id);
    setFormData({ name: category.name, type: category.type });
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ name: "", type: "EXPENSE" });
    setIsFormOpen(false);
  };

  const list = (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Category Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((cat) => (
          <TableRow key={cat.id} className="group transition-colors">
            <TableCell className="font-medium text-muted-foreground">CAT-{cat.id.toString().padStart(3, '0')}</TableCell>
            <TableCell className="font-semibold">{cat.name}</TableCell>
            <TableCell>
              <Badge variant={cat.type === "INCOME" ? "secondary" : "outline"} className={cat.type === "INCOME" ? "bg-emerald-500/10 text-emerald-500 border-none px-2 py-0.5" : "bg-orange-500/10 text-orange-500 border-none px-2 py-0.5"}>
                {cat.type}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1.5">
                <div className={`h-2 w-2 rounded-full ${cat.status === "ACTIVE" ? "bg-emerald-500" : "bg-muted-foreground/30"}`} />
                <span className="text-xs font-medium">{cat.status}</span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-500/10" onClick={() => handleEdit(cat)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const form = (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="cat-name">Category Name</Label>
        <Input 
          id="cat-name" 
          placeholder="e.g. Office Supplies" 
          className="bg-muted/30 focus:bg-background transition-colors"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cat-type">Transaction Type</Label>
        <Select 
          value={formData.type}
          onValueChange={(val) => setFormData({ ...formData, type: val ?? "EXPENSE" })}
        >
          <SelectTrigger className="bg-muted/30 focus:bg-background transition-colors">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EXPENSE">Expense</SelectItem>
            <SelectItem value="INCOME">Income</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-3 pt-4">
        <Button className="flex-1 bg-primary hover:bg-primary/90 shadow-sm" onClick={() => {
          if (editingId) {
            setCategories(categories.map(c => c.id === editingId ? { ...c, ...formData } : c));
          } else {
            setCategories([...categories, { id: categories.length + 1, ...formData, status: "ACTIVE" }]);
          }
          resetForm();
        }}>
          {editingId ? "Update Category" : "Save Category"}
        </Button>
        {editingId && (
          <Button variant="outline" className="flex-1" onClick={resetForm}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <MasterLayout 
      title="Category" 
      description="Define categories for income and expenses." 
      list={list} 
      form={form} 
      isOpen={isFormOpen}
      onOpenChange={setIsFormOpen}
    />
  );
}
