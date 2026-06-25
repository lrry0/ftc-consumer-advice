/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Article {
  id: string;
  title: string;
  category: string; // e.g. "Consumer Alert" or "Credit, Loans, and Debt"
  author: string; // e.g. "BCP Staff"
  date: string; // e.g. "June 24, 2026"
  snippet: string;
  content: string; // Rich markdown-like or paragraph content
  tags: string[]; // e.g. ["scam", "ftc", "pet"]
}

export interface TakeActionItem {
  id: string;
  label: string;
  iconName: string;
  description: string;
}

export interface ConsumerAlertItem {
  id: string;
  title: string;
  author: string;
  date: string;
  snippet: string;
}
