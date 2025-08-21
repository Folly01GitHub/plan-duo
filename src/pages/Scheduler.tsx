import { useState, useMemo } from 'react';
import { Scheduler } from '@bitnoi.se/react-scheduler';
import { Employee, Task } from '@/types';
import { EmployeeSidebar } from '@/components/EmployeeSidebar';
import { TaskDetailSidebar } from '@/components/TaskDetailSidebar';
import { SchedulerHeader } from '@/components/SchedulerHeader';
import { mockEmployees, mockTasks } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

export const SchedulerPage = () => {
  const [employees] = useState<Employee[]>(mockEmployees);
  const [tasks] = useState<Task[]>(mockTasks);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>();
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Conversion des données pour le scheduler React Scheduler
  const schedulerData = useMemo(() => {
    // Créer les ressources (employés)
    const resources = employees.map(employee => ({
      id: employee.id,
      label: {
        icon: "",
        title: `${employee.firstName} ${employee.lastName}`,
        subtitle: employee.position
      },
      data: tasks.filter(task => task.employeeId === employee.id).map(task => ({
        id: task.id,
        startDate: task.startDate,
        endDate: task.endDate,
        occupancy: 100,
        title: task.title,
        subtitle: task.description || '',
        description: task.description || '',
        bgColor: task.color || employee.color
      }))
    }));

    return resources;
  }, [employees, tasks]);

  // Gestionnaires d'événements
  const handleEmployeeSelect = (employee: Employee) => {
    setSelectedEmployee(employee);
    setSelectedTask(undefined);
  };

  const handleTaskSelect = (clickedResource: any) => {
    // Trouver la tâche sélectionnée
    const taskId = clickedResource?.id;
    if (taskId) {
      const task = tasks.find(t => t.id === taskId);
      const employee = employees.find(e => e.id === task?.employeeId);
      
      if (task && employee) {
        setSelectedTask(task);
        setSelectedEmployee(employee);
        toast({
          title: "Tâche sélectionnée",
          description: `${task.title} - ${employee.firstName} ${employee.lastName}`
        });
      }
    }
  };

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleAddTask = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "L'ajout de tâches sera bientôt disponible"
    });
  };

  const handleEditTask = (task: Task) => {
    toast({
      title: "Édition de tâche", 
      description: `Édition de : ${task.title}`
    });
  };

  const handleDeleteTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toast({
        title: "Tâche supprimée",
        description: `${task.title} a été supprimée`,
        variant: "destructive"
      });
      setSelectedTask(undefined);
    }
  };

  const handleCloseSidebar = () => {
    setSelectedTask(undefined);
  };

  // Statistiques
  const completedTasks = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <SchedulerHeader
        currentDate={currentDate}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
        onToday={handleToday}
        onAddTask={handleAddTask}
        totalTasks={tasks.length}
        completedTasks={completedTasks}
      />

      {/* Layout principal */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar employés */}
        <EmployeeSidebar
          employees={employees}
          onEmployeeSelect={handleEmployeeSelect}
          selectedEmployeeId={selectedEmployee?.id}
        />

        {/* Zone du scheduler */}
        <div className="flex-1 p-4">
          <div className="scheduler-container">
            <Scheduler
              data={schedulerData}
              isLoading={false}
              onTileClick={handleTaskSelect}
              config={{
                zoom: 1,
                filterButtonState: -1,
                maxRecordsPerPage: 50,
                showTooltip: true,
              }}
            />
          </div>
        </div>

        {/* Sidebar détails de tâche */}
        <TaskDetailSidebar
          task={selectedTask}
          employee={selectedEmployee}
          onClose={handleCloseSidebar}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
};