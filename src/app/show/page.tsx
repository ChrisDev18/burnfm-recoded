"use client"

import React from "react";
import {notFound, useSearchParams} from "next/navigation";
import '@/app/styles/icons.css';
import ShowDetailsPage from "@/app/show/ShowDetailsPage";


export default function ShowPage() {
  const searchParams = useSearchParams();
  const idString = searchParams.get('id');

  if (!idString) return notFound();

  const id = parseInt(idString);
  if (isNaN(id)) return notFound();

  return (
      <ShowDetailsPage id={id} />
  );
}