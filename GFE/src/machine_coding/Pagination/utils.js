export function getPaginationRange(currentPage, totalPages, maxVisible = 5) {
  const range = [];

  if (currentPage > 3) {
    range.push(1);
    if (currentPage > 4) {
      range.push("...");
    }
  }
  const start = Math.max(1, currentPage - 4);
  const end = Math.min(totalPages, currentPage + 4);

  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  if (end < totalPages - 1) {
    range.push("...");
  }
  if (end < totalPages) {
    range.push(totalPages);
  }
  return range;
}
