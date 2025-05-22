import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const ProfitLossModule = ({ projects, fetchProjectData }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [data, setData] = useState({
    income: {
      contract: 0,
      extras: 0,
    },
    expenses: {
      materials: 0,
      labor: 0,
      transport: 0,
      equipment: 0,
      overheads: 0,
    },
  });

  const totalIncome = parseFloat(data.income.contract) + parseFloat(data.income.extras);
  const totalExpenses =
    parseFloat(data.expenses.materials) +
    parseFloat(data.expenses.labor) +
    parseFloat(data.expenses.transport) +
    parseFloat(data.expenses.equipment) +
    parseFloat(data.expenses.overheads);

  const netProfit = totalIncome - totalExpenses;

  const handleChange = (section, key, value) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  useEffect(() => {
    if (selectedProject) {
      const fetched = fetchProjectData(selectedProject);
      if (fetched) setData(fetched);
    }
  }, [selectedProject]);

  return (
    <Card className="max-w-3xl mx-auto mt-6 p-4 shadow-xl rounded-2xl">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Profit & Loss – Precast Fence Project</h2>

        <div className="mb-4">
          <Label>Select Project</Label>
          <DropdownMenu>
            <DropdownMenuTrigger className="border px-3 py-2 rounded-md w-full text-left">
              {selectedProject ? selectedProject : "Choose project"}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {projects.map((proj) => (
                <DropdownMenuItem
                  key={proj.id}
                  onSelect={() => setSelectedProject(proj.name)}
                >
                  {proj.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator className="my-4" />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium">Income</h3>
            <Label>Contract Value</Label>
            <Input
              type="number"
              value={data.income.contract}
              onChange={(e) => handleChange("income", "contract", e.target.value)}
            />
            <Label className="mt-2">Extras</Label>
            <Input
              type="number"
              value={data.income.extras}
              onChange={(e) => handleChange("income", "extras", e.target.value)}
            />
            <p className="mt-2 font-semibold">Total Income: ₹{totalIncome.toFixed(2)}</p>
          </div>

          <div>
            <h3 className="font-medium">Expenses</h3>
            {Object.entries(data.expenses).map(([key, value]) => (
              <div key={key} className="mb-2">
                <Label className="capitalize">{key}</Label>
                <Input
                  type="number"
                  value={value}
                  onChange={(e) => handleChange("expenses", key, e.target.value)}
                />
              </div>
            ))}
            <p className="mt-2 font-semibold">Total Expenses: ₹{totalExpenses.toFixed(2)}</p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="text-xl font-bold text-center">
          Net {netProfit >= 0 ? "Profit" : "Loss"}: ₹{netProfit.toFixed(2)}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline">Export PDF</Button>
          <Button>Send via WhatsApp</Button>
          <Button variant="default">Save</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfitLossModule;
