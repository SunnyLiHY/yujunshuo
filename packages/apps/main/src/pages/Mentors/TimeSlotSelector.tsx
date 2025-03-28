import React, { useState } from 'react';
import { Select, DatePicker, TimePicker, Button, message } from 'antd';
import dayjs from 'dayjs';

export interface WeeklyTimeSlot {
  type: 'weekly';
  weekday: number; // 0-6 表示周日到周六
  timeRange: [string, string];
  key: string;
}

export interface DailyTimeSlot {
  type: 'daily';
  date: string;
  timeRange: [string, string];
  key: string;
}

export type TimeSlot = WeeklyTimeSlot | DailyTimeSlot;

interface TimeSlotSelectorProps {
  value?: TimeSlot[];
  onChange?: (timeSlots: TimeSlot[]) => void;
}

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({ value = [], onChange }) => {
  const [timeSlotType, setTimeSlotType] = useState<'weekly' | 'daily'>('weekly');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedWeekday, setSelectedWeekday] = useState<number | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState<[string, string]>(['', '']);

  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  const handleAddTimeSlot = () => {
    if (timeSlotType === 'weekly' && selectedWeekday === null) {
      message.error('请选择星期');
      return;
    }
    if (timeSlotType === 'daily' && !selectedDate) {
      message.error('请选择日期');
      return;
    }
    if (!selectedTimeRange[0] || !selectedTimeRange[1]) {
      message.error('请选择时间段');
      return;
    }

    const newTimeSlot: TimeSlot = timeSlotType === 'weekly'
      ? {
          type: 'weekly',
          weekday: selectedWeekday!,
          timeRange: selectedTimeRange,
          key: `weekly-${selectedWeekday}-${selectedTimeRange[0]}-${selectedTimeRange[1]}`,
        }
      : {
          type: 'daily',
          date: selectedDate,
          timeRange: selectedTimeRange,
          key: `daily-${selectedDate}-${selectedTimeRange[0]}-${selectedTimeRange[1]}`,
        };

    // 检查是否已存在相同的时间段
    const isDuplicate = value.some((slot) => slot.key === newTimeSlot.key);
    if (isDuplicate) {
      message.error('该时间段已存在');
      return;
    }

    onChange?.([...value, newTimeSlot]);
    // 清空选择
    if (timeSlotType === 'daily') {
      setSelectedDate('');
    } else {
      setSelectedWeekday(null);
    }
    setSelectedTimeRange(['', '']);
  };

  const handleRemoveTimeSlot = (key: string) => {
    onChange?.(value.filter((slot) => slot.key !== key));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <Select value={timeSlotType} onChange={setTimeSlotType} style={{ width: 140 }}>
          <option value="weekly">每周固定时间</option>
          <option value="daily">指定日期时间</option>
        </Select>

        {timeSlotType === 'weekly' ? (
          <Select
            placeholder="选择星期"
            style={{ width: 140 }}
            value={selectedWeekday}
            onChange={setSelectedWeekday}
          >
            {weekDays.map((day, index) => (
              <option key={index} value={index}>
                {day}
              </option>
            ))}
          </Select>
        ) : (
          <DatePicker
            value={selectedDate ? dayjs(selectedDate) : null}
            onChange={(date) => setSelectedDate(date ? date.format('YYYY-MM-DD') : '')}
            placeholder="选择日期"
          />
        )}

        <TimePicker.RangePicker
          format="HH:mm"
          value={
            selectedTimeRange[0]
              ? [dayjs(selectedTimeRange[0], 'HH:mm'), dayjs(selectedTimeRange[1], 'HH:mm')]
              : null
          }
          onChange={(times) => {
            if (times) {
              setSelectedTimeRange([times[0]!.format('HH:mm'), times[1]!.format('HH:mm')]);
            } else {
              setSelectedTimeRange(['', '']);
            }
          }}
        />
        <Button type="primary" onClick={handleAddTimeSlot}>
          添加时间段
        </Button>
      </div>

      {value.length > 0 && (
        <div className="bg-gray-50 p-4 rounded">
          <div className="text-sm text-gray-500 mb-2">已添加的时间段：</div>
          <div className="space-y-2">
            {value.map((slot) => (
              <div key={slot.key} className="flex justify-between items-center bg-white p-2 rounded">
                <span>
                  {slot.type === 'weekly'
                    ? `每周${weekDays[slot.weekday]} ${slot.timeRange[0]}-${slot.timeRange[1]}`
                    : `${slot.date} ${slot.timeRange[0]}-${slot.timeRange[1]}`}
                </span>
                <Button type="text" danger onClick={() => handleRemoveTimeSlot(slot.key)}>
                  删除
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};