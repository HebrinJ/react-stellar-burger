import style from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../../utils/prop-types';

function IngredientDetails({details}) {

    return (
        <div className={style.position}>
            <img className={style.image} src={details.image_large} alt={details.name}></img>
            <p className={style.label+ ' text text_type_main-medium'}>{details.name}</p>
            <div className={style.containerInfo}>
                <div className={style.detailsBlock}>
                    <p className='text text_type_main-default text_color_inactive'>Калории, ккал</p>
                    <p className='text text_type_main-default text_color_inactive'>{details.calories}</p>
                </div>
                <div className={style.detailsBlock}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{details.proteins}</p>
                </div>
                <div className={style.detailsBlock}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{details.fat}</p>
                </div>
                <div className={style.detailsBlock}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{details.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    details: ingredientPropType
}

export default IngredientDetails;