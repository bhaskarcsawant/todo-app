import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

import toast from 'react-hot-toast';

import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addTodo, updateTodo } from '../slices/todoSlice';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';

const container = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: 0.5,
  },
  exit: {
    opacity: 0,
  },
};
const modal = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
  },
};
const close = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: -35,
    opacity: 1,
    transition: 0.5,
  },
};

function TodoModal({ type, modalOpen, setModalOpen, todo, ...rest }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle('');
      setStatus('incomplete');
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '') {
      toast.error("Title shouldn't be empty");
    }
    if (type === 'add') {
      if (title && status) {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success('Task added successfully');
        setModalOpen(false);
      }
    }
    if (type === 'update') {
      if (todo.title !== title || todo.status !== status) {
        dispatch(
          updateTodo({
            ...todo,
            title,
            status,
          })
        );
        toast.success('Task updated successfully');
        setModalOpen(false);
      } else {
        toast.error('No changes made');
      }
    }
  };
  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          variants={container}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div className={styles.container} variants={modal}>
            <motion.div
              className={styles.closeButton}
              onClick={() => setModalOpen(false)}
              onKeyDown={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              variants={close}
            >
              <MdOutlineClose />
            </motion.div>
            <form
              className={styles.form}
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <h1 className={styles.formTitle}>
                {type === 'update' ? 'Update' : 'Add'} Task
              </h1>
              <label htmlFor="title">
                Title{' '}
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="status">
                Status
                <select
                  name="status"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Complete</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === 'update' ? 'Update' : 'Add'} Task
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setModalOpen(false)}
                  onKeyDown={() => setModalOpen(false)}
                >
                  Close
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default TodoModal;
