
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
        return 'bg-green-100 text-green-800 border-green-200';
      case 'good':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'poor':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Data Found</h3>
            <p className="text-gray-600">
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
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-900 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            Device Data ({data.length} devices)
          </span>
          {searchTerm && (
            <Badge variant="outline" className="text-blue-600 border-blue-200">
              Filtered: "{searchTerm}"
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                {visibleColumns.map(column => (
                  <th key={column} className="text-left p-4 text-gray-700 font-medium bg-gray-50">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((device, index) => (
                <tr
                  key={device.DeviceName}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  {visibleColumns.map(column => (
                    <td key={column} className="p-4 text-gray-900">
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
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} devices
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-white border-gray-300 hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-gray-700 px-3">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="bg-white border-gray-300 hover:bg-gray-50"
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
