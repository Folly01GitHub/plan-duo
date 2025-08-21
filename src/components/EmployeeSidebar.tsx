import { useState } from 'react';
import { Employee } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search, Plus, UserCheck, UserX } from 'lucide-react';

interface EmployeeSidebarProps {
  employees: Employee[];
  onEmployeeSelect?: (employee: Employee) => void;
  selectedEmployeeId?: string;
}

export const EmployeeSidebar = ({ 
  employees, 
  onEmployeeSelect, 
  selectedEmployeeId 
}: EmployeeSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter(employee =>
    `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="sidebar-section w-80 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Équipe</h2>
          <Button size="sm" className="gradient-primary text-white">
            <Plus className="h-4 w-4 mr-1" />
            Ajouter
          </Button>
        </div>
        
        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un employé..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Liste des employés */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              className={`employee-card ${
                selectedEmployeeId === employee.id 
                  ? 'ring-2 ring-primary shadow-medium' 
                  : ''
              }`}
              onClick={() => onEmployeeSelect?.(employee)}
            >
              <div className="flex items-center space-x-3">
                {/* Avatar avec couleur personnalisée */}
                <div 
                  className="relative"
                  style={{ 
                    borderRadius: '50%', 
                    padding: '2px',
                    background: `linear-gradient(135deg, ${employee.color}, ${employee.color}80)`
                  }}
                >
                  <Avatar className="h-10 w-10 bg-white">
                    <AvatarFallback 
                      className="text-sm font-medium"
                      style={{ color: employee.color }}
                    >
                      {getInitials(employee.firstName, employee.lastName)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                {/* Informations employé */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-sm text-foreground truncate">
                      {employee.firstName} {employee.lastName}
                    </p>
                    {employee.isAvailable ? (
                      <UserCheck className="h-4 w-4 text-success" />
                    ) : (
                      <UserX className="h-4 w-4 text-warning" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {employee.position}
                  </p>
                  <div className="mt-1">
                    <Badge 
                      variant={employee.isAvailable ? "default" : "secondary"}
                      className={`text-xs ${
                        employee.isAvailable 
                          ? 'bg-success/10 text-success border-success/20' 
                          : 'bg-warning/10 text-warning border-warning/20'
                      }`}
                    >
                      {employee.isAvailable ? 'Disponible' : 'Occupé'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">
              Aucun employé trouvé
            </p>
          </div>
        )}
      </ScrollArea>

      {/* Statistiques rapides */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-success">
              {employees.filter(e => e.isAvailable).length}
            </p>
            <p className="text-xs text-muted-foreground">Disponibles</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-warning">
              {employees.filter(e => !e.isAvailable).length}
            </p>
            <p className="text-xs text-muted-foreground">Occupés</p>
          </div>
        </div>
      </div>
    </div>
  );
};