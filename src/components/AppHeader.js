import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss';
import TodoModal from './TodoModal';
import { updateFilter } from '../slices/todoSlice';

function AppHeader({ children, ...rest }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setfilter] = useState('all');
  const dispatch = useDispatch();
  const handleFilter = (e) => {
    setfilter(e.target.value);
    dispatch(updateFilter(e.target.value));
  };
  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Task
      </Button>
      <SelectButton id="status" value={filter} onChange={handleFilter}>
        <option value="all">ALL</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">complete</option>
      </SelectButton>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}
export default AppHeader;
