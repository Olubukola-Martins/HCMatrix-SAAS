import { Form } from 'antd'
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';
import { AppButton } from 'components/button/AppButton';

const Comment = () => {
  return (
    <Form className='flex flex-col gap-y-5'>
          <p>Write a comment for the candidate</p>
          <div className='flex flex-col items-end'>
              
          <FormItem name={'comment'}>
              <TextArea rows={8} placeholder='comment' />
          </FormItem>
              <AppButton type='submit' label='Submit' />
          </div>
    </Form>
  );
}

export default Comment