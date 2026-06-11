"use client";

import * as React from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanCard } from "./KanbanCard";
import { Project, ProjectStatus, updateProject } from "@/app/actions/projects";
import { createPortal } from "react-dom";

interface KanbanBoardProps {
  initialProjects: Project[];
}

const COLUMNS: { id: string; title: string }[] = [
  { id: "prospect", title: "Prospect" },
  { id: "proposal_sent", title: "Proposal Sent" },
  { id: "in_progress", title: "In Progress" },
  { id: "completed", title: "Completed" },
  { id: "paused", title: "Paused" },
];

export function KanbanBoard({ initialProjects }: KanbanBoardProps) {
  const [projects, setProjects] = React.useState<Project[]>(initialProjects);
  const [activeProject, setActiveProject] = React.useState<Project | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const project = projects.find((p) => p.id === active.id);
    if (project) setActiveProject(project);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveACard = active.data.current?.type === "Project";
    const isOverACard = over.data.current?.type === "Project";

    if (!isActiveACard) return;

    // Dropping a card over another card
    if (isActiveACard && isOverACard) {
      setProjects((prev) => {
        const activeIndex = prev.findIndex((p) => p.id === activeId);
        const overIndex = prev.findIndex((p) => p.id === overId);

        if (prev[activeIndex].status !== prev[overIndex].status) {
          const updatedProjects = [...prev];
          updatedProjects[activeIndex] = {
            ...updatedProjects[activeIndex],
            status: updatedProjects[overIndex].status,
          };
          return arrayMove(updatedProjects, activeIndex, overIndex);
        }

        return arrayMove(prev, activeIndex, overIndex);
      });
    }

    // Dropping a card over a column
    const isOverAColumn = COLUMNS.some((col) => col.id === overId);
    if (isActiveACard && isOverAColumn) {
      setProjects((prev) => {
        const activeIndex = prev.findIndex((p) => p.id === activeId);
        const updatedProjects = [...prev];
        updatedProjects[activeIndex] = {
          ...updatedProjects[activeIndex],
          status: overId as ProjectStatus,
        };
        return arrayMove(updatedProjects, activeIndex, activeIndex);
      });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveProject(null);

    if (!over) return;

    const project = projects.find((p) => p.id === active.id);
    if (project) {
      // In a real app, this would be a server action call
      console.log(`Updating project ${project.id} status to ${project.status}`);
      await updateProject(project.id, { status: project.status });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-nowrap gap-6 overflow-x-auto pb-8 h-full min-h-[calc(100vh-12rem)] scrollbar-hide">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            projects={projects.filter((p) => p.status === col.id)}
          />
        ))}
      </div>

      {typeof document !== "undefined" && createPortal(
        <DragOverlay adjustScale={false} dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.5',
              },
            },
          }),
        }}>
          {activeProject ? <KanbanCard project={activeProject} /> : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
