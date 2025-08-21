import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Plus, 
  Filter,
  Settings,
  Download
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface SchedulerHeaderProps {
  currentDate: Date;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
  onAddTask?: () => void;
  totalTasks: number;
  completedTasks: number;
}

export const SchedulerHeader = ({
  currentDate,
  onPreviousWeek,
  onNextWeek,
  onToday,
  onAddTask,
  totalTasks,
  completedTasks
}: SchedulerHeaderProps) => {
  return (
    <div className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Navigation et titre */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={onPreviousWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onToday}>
              Aujourd'hui
            </Button>
            <Button variant="outline" size="sm" onClick={onNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Planification des Tâches
              </h1>
              <p className="text-sm text-muted-foreground">
                Semaine du {format(currentDate, 'dd MMMM yyyy', { locale: fr })}
              </p>
            </div>
          </div>
        </div>

        {/* Actions et statistiques */}
        <div className="flex items-center space-x-4">
          {/* Statistiques rapides */}
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {totalTasks} tâches
            </Badge>
            <Badge variant="secondary" className="bg-success/10 text-success">
              {completedTasks} terminées
            </Badge>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filtres
            </Button>
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Exporter
            </Button>
            
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button 
              className="gradient-primary text-white"
              size="sm"
              onClick={onAddTask}
            >
              <Plus className="h-4 w-4 mr-1" />
              Nouvelle tâche
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};