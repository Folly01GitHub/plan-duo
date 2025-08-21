import { Task, Employee, TaskCategory, TaskPriority } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Clock, 
  User, 
  AlertCircle, 
  Edit, 
  Trash2, 
  X 
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getTaskCategoryLabel, getTaskPriorityLabel, getTaskStatusLabel } from '@/data/mockData';

interface TaskDetailSidebarProps {
  task?: Task;
  employee?: Employee;
  onClose: () => void;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

export const TaskDetailSidebar = ({ 
  task, 
  employee, 
  onClose, 
  onEdit, 
  onDelete 
}: TaskDetailSidebarProps) => {
  if (!task || !employee) {
    return (
      <div className="sidebar-section w-80 flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Aucune tâche sélectionnée
          </h3>
          <p className="text-sm text-muted-foreground">
            Cliquez sur une tâche dans le planning pour voir les détails
          </p>
        </div>
      </div>
    );
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getPriorityColor = (priority: TaskPriority) => {
    const colors = {
      low: 'bg-success/10 text-success border-success/20',
      medium: 'bg-primary/10 text-primary border-primary/20',
      high: 'bg-warning/10 text-warning border-warning/20',
      urgent: 'bg-danger/10 text-danger border-danger/20'
    };
    return colors[priority];
  };

  const getCategoryColor = (category: TaskCategory) => {
    const colors = {
      meeting: 'task-badge-meeting',
      development: 'task-badge-development', 
      support: 'task-badge-support',
      training: 'bg-primary/10 text-primary border-primary/20',
      admin: 'bg-muted text-muted-foreground border-muted'
    };
    return colors[category];
  };

  const duration = Math.round((task.endDate.getTime() - task.startDate.getTime()) / (1000 * 60));
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return (
    <div className="sidebar-section w-80 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-foreground">
            Détails de la tâche
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Titre et description */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {task.description}
              </p>
            )}
          </div>

          <Separator />

          {/* Employé assigné */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground flex items-center">
              <User className="h-4 w-4 mr-2" />
              Employé assigné
            </h4>
            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div 
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
              <div>
                <p className="font-medium text-sm text-foreground">
                  {employee.firstName} {employee.lastName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {employee.position}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Informations temporelles */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Planning
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date :</span>
                <span className="font-medium">
                  {format(task.startDate, 'EEEE dd MMMM yyyy', { locale: fr })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Début :</span>
                <span className="font-medium">
                  {format(task.startDate, 'HH:mm')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fin :</span>
                <span className="font-medium">
                  {format(task.endDate, 'HH:mm')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Durée :
                </span>
                <span className="font-medium">
                  {hours > 0 && `${hours}h `}{minutes > 0 && `${minutes}min`}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Badges et statut */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Statut</h4>
            <div className="flex flex-wrap gap-2">
              <Badge className={getCategoryColor(task.category)}>
                {getTaskCategoryLabel(task.category)}
              </Badge>
              <Badge className={getPriorityColor(task.priority)}>
                <AlertCircle className="h-3 w-3 mr-1" />
                {getTaskPriorityLabel(task.priority)}
              </Badge>
              <Badge variant="outline">
                {getTaskStatusLabel(task.status)}
              </Badge>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Actions */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
            onClick={() => onEdit?.(task)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Modifier
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => onDelete?.(task.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};