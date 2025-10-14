import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const DateSelector = ({ selectedDate, availableDates, onDateChange }) => {
  const [open, setOpen] = React.useState(false);
  const [currentMonth, setCurrentMonth] = React.useState(selectedDate || new Date());

  // Atualiza o mês quando a data selecionada muda
  React.useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(selectedDate);
    }
  }, [selectedDate]);

  const formatDatePT = (date) => {
    if (!date) return 'Selecione uma data';
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  const isDateAvailable = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return availableDates.includes(dateStr);
  };

  return (
    <div className="flex items-center gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[280px] justify-start text-left font-normal bg-gray-900 border-gray-700 text-white hover:bg-gray-800"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? formatDatePT(selectedDate) : 'Selecione uma data'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-700">
          <Calendar
            mode="single"
            selected={selectedDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            onSelect={(date) => {
              if (date && isDateAvailable(date)) {
                onDateChange(date);
                setOpen(false);
              }
            }}
            disabled={(date) => !isDateAvailable(date)}
            initialFocus
            className="bg-gray-900 text-white"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateSelector;