
import React, { useState, useMemo } from 'react';
import { Search, Filter, FileDown, Calendar, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import DeviceTable from '@/components/DeviceTable';
import { generateMockData } from '@/utils/mockData';
import { exportToCSV } from '@/utils/exportUtils';
import { DeviceData } from '@/types/device';

const Index = () => {
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'DeviceName', 'AppVersion', 'FirmwareVersion', 'DeviceHealth'
  ]);

  const organizations = [
    'TechCorp Healthcare',
    'Global Medical Systems',
    'Advanced Health Solutions',
    'MedTech Innovations',
    'Healthcare Network Inc'
  ];

  const allColumns = [
    'DeviceName',
    'AppVersion',
    'FirmwareVersion',
    'DozeeFilesUploaded',
    'DozeeFilesInPod',
    'DozeeFilesInHub',
    'SerialException',
    'WifiHours',
    'RestartCount',
    'DeviceHealth',
    'SheetConnectionEvents',
    'SheetDisconnectionEvents',
    'PulseOximeterConnection',
    'OxygenSaturationDuration',
    'BPMonitorConnections',
    'BPRecordedEvents',
    'EcgProbeConnection',
    'EcgSignalDuration',
    'TemperatureConnections',
    'TemperatureDuration'
  ];

  const mockData = useMemo(() => {
    if (selectedOrg && dateFrom && dateTo) {
      return generateMockData(selectedOrg, dateFrom, dateTo);
    }
    return [];
  }, [selectedOrg, dateFrom, dateTo]);

  const filteredData = useMemo(() => {
    return mockData.filter(device =>
      device.DeviceName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [mockData, searchTerm]);

  const handleColumnToggle = (column: string, checked: boolean) => {
    if (column === 'DeviceName') return; // DeviceName is always visible
    
    if (checked) {
      setVisibleColumns(prev => [...prev, column]);
    } else {
      setVisibleColumns(prev => prev.filter(col => col !== column));
    }
  };

  const handleExport = () => {
    if (filteredData.length > 0) {
      exportToCSV(filteredData, visibleColumns, selectedOrg);
    }
  };

  const isDataReady = selectedOrg && dateFrom && dateTo;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Building2 className="text-blue-400" />
            Device Monitoring Dashboard
          </h1>
          <p className="text-slate-300">Monitor and analyze device performance across organizations</p>
        </div>

        {/* Top Controls */}
        <Card className="mb-6 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Organization Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Organization</label>
                <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select organization..." />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {organizations.map(org => (
                      <SelectItem key={org} value={org} className="text-white hover:bg-slate-600">
                        {org}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date From */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">From Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-slate-700 border-slate-600 text-white hover:bg-slate-600",
                        !dateFrom && "text-slate-400"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-slate-700 border-slate-600">
                    <CalendarComponent
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Date To */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">To Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-slate-700 border-slate-600 text-white hover:bg-slate-600",
                        !dateTo && "text-slate-400"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-slate-700 border-slate-600">
                    <CalendarComponent
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Controls Section - Only show when data is ready */}
        {isDataReady && (
          <Card className="mb-6 bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search device names..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                  </div>

                  {/* Column Filter */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                        <Filter className="w-4 h-4 mr-2" />
                        Columns ({visibleColumns.length})
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 bg-slate-700 border-slate-600 max-h-96 overflow-y-auto">
                      <div className="space-y-3">
                        <h4 className="font-medium text-white">Select Columns</h4>
                        {allColumns.map(column => (
                          <div key={column} className="flex items-center space-x-2">
                            <Checkbox
                              id={column}
                              checked={visibleColumns.includes(column)}
                              onCheckedChange={(checked) => handleColumnToggle(column, !!checked)}
                              disabled={column === 'DeviceName'}
                              className="border-slate-500"
                            />
                            <label
                              htmlFor={column}
                              className={cn(
                                "text-sm text-white cursor-pointer",
                                column === 'DeviceName' && "text-slate-400"
                              )}
                            >
                              {column}
                              {column === 'DeviceName' && ' (Always visible)'}
                            </label>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Export Button */}
                <Button
                  onClick={handleExport}
                  disabled={filteredData.length === 0}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <FileDown className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        {!isDataReady ? (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Get Started</h3>
                <p className="text-slate-400">Please select an organization and date range to view device data</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <DeviceTable
            data={filteredData}
            visibleColumns={visibleColumns}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
