
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Database } from 'lucide-react';
import { DeviceData } from '@/types/device';
import { Badge } from '@/components/ui/badge';

interface DeviceTableProps {
  data: DeviceData[];
  visibleColumns: string[];
  searchTerm: string;
}

const DeviceTable: React.FC<DeviceTableProps> = ({ data, visibleColumns, searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const getHealthBadgeColor = (health: string) => {
    switch (health.toLowerCase()) {
      case 'excellent':
        return 'bg-green-500 text-white';
      case 'good':
        return 'bg-blue-500 text-white';
      case 'fair':
        return 'bg-yellow-500 text-black';
      case 'poor':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const formatCellValue = (value: any, column: string) => {
    if (column === 'DeviceHealth') {
      return (
        <Badge className={getHealthBadgeColor(value)}>
          {value}
        </Badge>
      );
    }
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  };

  if (data.length === 0) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <Database className="w-16 h-16 text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Data Found</h3>
            <p className="text-slate-400">
              {searchTerm 
                ? `No devices found matching "${searchTerm}"`
                : "No device data available for the selected criteria"
              }
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-400" />
            Device Data ({data.length} devices)
          </span>
          {searchTerm && (
            <Badge variant="outline" className="text-blue-400 border-blue-400">
              Filtered: "{searchTerm}"
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-600">
                {visibleColumns.map(column => (
                  <th key={column} className="text-left p-4 text-slate-300 font-medium">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((device, index) => (
                <tr
                  key={device.DeviceName}
                  className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
                >
                  {visibleColumns.map(column => (
                    <td key={column} className="p-4 text-slate-200">
                      {formatCellValue(device[column as keyof DeviceData], column)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-700">
            <p className="text-sm text-slate-400">
              Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} devices
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-slate-300 px-3">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeviceTable;
