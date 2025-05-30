
import { DeviceData } from '@/types/device';

export const exportToCSV = (
  data: DeviceData[],
  visibleColumns: string[],
  organisation: string
): void => {
  if (data.length === 0) return;

  // Create CSV headers
  const headers = visibleColumns.join(',');
  
  // Create CSV rows
  const rows = data.map(device => 
    visibleColumns.map(column => {
      const value = device[column as keyof DeviceData];
      // Escape commas and quotes in CSV
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(',')
  );

  // Combine headers and rows
  const csvContent = [headers, ...rows].join('\n');

  // Create and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `device-monitoring-${organisation.replace(/\s+/g, '-').toLowerCase()}-${timestamp}.csv`;
    link.setAttribute('download', filename);
    
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }
};
