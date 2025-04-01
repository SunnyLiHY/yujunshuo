export interface BookingFormData {
  serviceId: number;
  date: string;
  timeSlot: string;
  message: string;
}

import React, { useState } from 'react';
import { Modal, Form, DatePicker, Select, Input, message, QRCode, Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
import { DaySchedule, Service } from '../../types';

interface BookingModalProps {
  visible: boolean;
  onClose: () => void;
  service: Service;
  mentorName: string;
  availability: DaySchedule[];
}

const BookingModal: React.FC<BookingModalProps> = ({
  visible,
  onClose,
  service,
  mentorName,
  availability
}) => {
  const [form] = useForm();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentQRCode, setPaymentQRCode] = useState('');

  // 获取选定日期的可用时间段
  const getAvailableTimeSlots = (date: string) => {
    const schedule = availability.find(day => day.date === date);
    return schedule?.timeSlots.filter(slot => slot.available) || [];
  };

  // 处理日期选择
  const handleDateChange = (date: moment.Moment | null) => {
    if (date) {
      const dateStr = date.format('YYYY-MM-DD');
      setSelectedDate(dateStr);
      form.setFieldsValue({ timeSlot: undefined });
    }
  };

  // 处理表单提交
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      const bookingData = {
        ...values,
        serviceId: service.id,
        date: values.date.format('YYYY-MM-DD')
      };

      // 模拟创建预约订单并获取支付二维码
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 模拟获取支付二维码的URL（实际项目中需要从后端获取）
      const mockQRCodeUrl = `https://api.example.com/payment/qr-code?orderId=123&amount=${service.price}`;
      setPaymentQRCode(mockQRCodeUrl);
      setShowPayment(true);

    } catch (error) {
      console.error('Booking failed:', error);
      message.error('预约失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 处理支付完成
  const handlePaymentComplete = () => {
    message.success('支付成功！');
    setShowPayment(false);
    onClose();
    form.resetFields();
  };

  // 处理支付取消
  const handlePaymentCancel = () => {
    setShowPayment(false);
    message.info('您已取消支付');
  };

  // 禁用过去的日期
  const disabledDate = (current: moment.Moment) => {
    return current && current < moment().startOf('day');
  };

  return (
    <>
      <Modal
        title="预约咨询"
        open={visible && !showPayment}
        onCancel={onClose}
        onOk={handleSubmit}
        confirmLoading={loading}
        okText="确认预约"
        cancelText="取消"
        width={520}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            service: service.title,
          }}
        >
          <Form.Item label="咨询项目" name="service">
            <Input disabled />
          </Form.Item>

          <Form.Item label="咨询师" name="mentorName" initialValue={mentorName}>
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="选择日期"
            name="date"
            rules={[{ required: true, message: '请选择咨询日期' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              disabledDate={disabledDate}
              onChange={handleDateChange}
              placeholder="请选择日期"
            />
          </Form.Item>

          <Form.Item
            label="选择时间"
            name="timeSlot"
            rules={[{ required: true, message: '请选择咨询时间' }]}
          >
            <Select placeholder="请选择时间" disabled={!selectedDate}>
              {getAvailableTimeSlots(selectedDate).map((slot, index) => (
                <Select.Option key={index} value={`${slot.start}-${slot.end}`}>
                  {`${slot.start}-${slot.end}`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="留言"
            name="message"
            rules={[{ max: 200, message: '留言不能超过200字' }]}
          >
            <Input.TextArea
              placeholder="请输入您想咨询的具体问题（选填）"
              rows={4}
              maxLength={200}
              showCount
            />
          </Form.Item>

          <div className="text-gray-600 text-sm mt-4">
            <p>预约说明：</p>
            <ul className="list-disc list-inside space-y-1">
              <li>咨询时长：{service.duration}分钟</li>
              <li>咨询费用：¥{service.price}</li>
              <li>预约成功后将发送确认邮件</li>
              <li>如需取消预约，请提前24小时操作</li>
            </ul>
          </div>
        </Form>
      </Modal>
      <Modal
        title="支付咨询费用"
        open={showPayment}
        onCancel={handlePaymentCancel}
        footer={[
          <Button key="cancel" onClick={handlePaymentCancel}>
            取消支付
          </Button>,
          <Button key="complete" type="primary" onClick={handlePaymentComplete}>
            我已完成支付
          </Button>
        ]}
        width={400}
      >
        <div className="text-center">
          <p className="mb-4">请使用支付宝扫描下方二维码完成支付</p>
          <p className="text-lg font-bold mb-4">支付金额：¥{service.price}</p>
          <div className="flex justify-center">
            <QRCode
              value={paymentQRCode}
              size={200}
              style={{ marginBottom: 16 }}
            />
          </div>
          <p className="text-sm text-gray-500">
            支付完成后，请点击"我已完成支付"按钮
          </p>
        </div>
      </Modal>
    </>
  );
};

export default BookingModal;