"use client";

import React, { useRef, useState } from "react";

interface DraggableTableWrapperProps {
    children: React.ReactNode;
    columnWidth?: number;
    columnsPerSlide?: number;
}

const DraggableTableWrapper: React.FC<DraggableTableWrapperProps> = ({
    children,
    columnWidth = 200,
    columnsPerSlide = 4,
}) => {
    const tableWrapperRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const onMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (tableWrapperRef.current?.offsetLeft || 0));
        setScrollLeft(tableWrapperRef.current?.scrollLeft || 0);
        if (tableWrapperRef.current) tableWrapperRef.current.style.cursor = "grabbing";
    };

    const onMouseLeave = () => {
        setIsDragging(false);
        if (tableWrapperRef.current) tableWrapperRef.current.style.cursor = "grab";
    };

    const onMouseUp = () => {
        setIsDragging(false);
        if (!tableWrapperRef.current) return;

        // Snap scroll to nearest multiple of columnsPerSlide
        const scroll = tableWrapperRef.current.scrollLeft;
        const slideWidth = columnWidth * columnsPerSlide;
        const snapPosition = Math.round(scroll / slideWidth) * slideWidth;
        tableWrapperRef.current.scrollTo({
            left: snapPosition,
            behavior: "smooth",
        });

        if (tableWrapperRef.current) tableWrapperRef.current.style.cursor = "grab";
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !tableWrapperRef.current) return;
        e.preventDefault();
        const x = e.pageX - tableWrapperRef.current.offsetLeft;
        const walk = x - startX;
        tableWrapperRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div
            ref={tableWrapperRef}
            className="overflow-x-auto cursor-grab [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
        >
            {children}
        </div>
    );
};

export default DraggableTableWrapper;
