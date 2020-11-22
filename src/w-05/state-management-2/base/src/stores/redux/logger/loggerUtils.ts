import { nanoid } from '@reduxjs/toolkit';

export function getId(): string {
  return nanoid();
}
