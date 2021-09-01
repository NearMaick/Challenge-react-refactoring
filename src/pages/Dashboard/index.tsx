import { Component } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { useState } from 'react';
import { useEffect } from 'react';

interface FoodProps {
  id: number
  name: string
  description: string
}

export function Dashboard () {
  const [foods, setFoods] = useState<FoodProps[]>([])
  const [editingFood, setEditingFood] = useState({})
  const [modalOpen, setModalOpen] = useState(true)
  const [editModalOpen, setEditModalOpen] = useState(false)

  useEffect(() => {
    async function fetchFoodsData () {
      const response = await api.get('/foods')
    setFoods(response.data)
    }

    fetchFoodsData()
  }, [])

  
  // constructor(props) {
    //   super(props);
    //   this.state = {
      //     foods: [],
      //     editingFood: {},
      //     modalOpen: false,
      //     editModalOpen: false,
      //   }
      // }
      
      // async componentDidMount() {
        //   const response = await api.get('/foods');
        
        //   this.setState({ foods: response.data });
        // }
        
        // TODO
  async function handleAddFood (food: any) {    
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  // handleUpdateFood = async food => {
  //   const { foods, editingFood } = this.state;

  //   try {
  //     const foodUpdated = await api.put(
  //       `/foods/${editingFood.id}`,
  //       { ...editingFood, ...food },
  //     );

  //     const foodsUpdated = foods.map(f =>
  //       f.id !== foodUpdated.data.id ? f : foodUpdated.data,
  //     );

  //     this.setState({ foods: foodsUpdated });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // handleDeleteFood = async id => {
  //   const { foods } = this.state;

  //   await api.delete(`/foods/${id}`);

  //   const foodsFiltered = foods.filter(food => food.id !== id);

  //   this.setState({ foods: foodsFiltered });
  // }

  function toggleModal () {
    console.log('test')
    setModalOpen(!modalOpen);
  }

  function toggleEditModal () {
    console.log('test')
    setEditModalOpen(!editModalOpen);
  }

  // handleEditFood = food => {
  //   this.setState({ editingFood: food, editModalOpen: true });
  // }
  
    // const { modalOpen, editModalOpen, editingFood, foods } = this.state;

    return (
      <>
        <Header />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          // editingFood={editingFood}
          // handleUpdateFood={this.handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                // handleDelete={this.handleDeleteFood}
                // handleEditFood={this.handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
  
};
