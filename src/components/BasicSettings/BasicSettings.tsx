import "./BasicSettings.css"

import "./BasicSettings.css";
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Armbian } from "../../assets/armdata/v23/Armbian";

const boards = new Armbian("23", ["1", "2"]);

interface IFormInput {
  board: string;
  core: string;
}

const BasicSettings: React.FC = () => {
  const { control, watch, setValue } = useForm<IFormInput>({
    defaultValues: {
      board: boards.boards[0].name,
      core: boards.boards[0].kernels[0]
    }
  });
  const [selectedBoard, setSelectedBoard] = useState<string>(boards.boards[0].name);

  const board = watch('board');
  const core = watch('core');

  useEffect(() => {
    setValue('board', boards.boards[0].name);
    setValue('core', boards.boards[0].kernels[0]);
  }, [setValue]);

  useEffect(() => {                     // Обновляем ядра на основе выбранной платы
    if (board) {
      setSelectedBoard(board);
      const selectedBoardData = boards.boards.find(b => b.name === board);
      if (selectedBoardData) {
        setValue('core', selectedBoardData.kernels[0]);
      }
    }
  }, [board, setValue]);

  useEffect(() => {                     // Сохраняем данные при изменении ядра
    if (core) {
      saveData({ board, core });
    }
  }, [core]);

  const saveData = (data: IFormInput) => {
    console.log(data);
  };

  return (
    <form>
      <Controller
        name="board"
        control={control}
        render={({ field }) => (
          <select {...field} onChange={(e) => {
            field.onChange(e);
            setValue('core', ''); // Сбросить ядро при изменении платы
          }}>
            {boards.boards.map((item, index) => (
              <option key={index} value={item.name}>{item.text}</option>
            ))}
          </select>
        )}
      />

      <Controller
        name="core"
        control={control}
        render={({ field }) => (
          <select {...field} onChange={(el) => {
            field.onChange(el);
            saveData({ board, core: el.target.value });        // Сохранить данные при изменении ядра
          }}>
            {boards.boards.find(b => b.name === selectedBoard)?.kernels.map((kernel, index) => (
              <option key={index} value={kernel}>{kernel}</option>
            ))}
          </select>
        )}
      />
    </form>
  );
};

export default BasicSettings;
