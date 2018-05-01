const Hotel = require('../models/hotel.model');

_this = this;

exports.getHotels = async (query, page, limit) => {
    const options = {
        page,
        limit
    }
    try {
        return await Hotel.find(query);
        //return await Hotel.paginate(query, options);
    } catch (e) {
        throw Error('Ocurrio un error mientras se paginaban los Hoteles');
    }
}

exports.findById = async (id) => {
    try{
        return await Hotel.findOne({"id":id});
    }catch(e){
        throw Error("Ocurrio un error mientras se buscaba el Hotel");
    }
}

exports.createHotel = async (hotel) => {    
    const newHotel = new Hotel({
        name: hotel.name,
        stars: hotel.stars,
        price: hotel.price,
        image: hotel.image,
        amenities: hotel.amenities
    })
    try{
        return await newHotel.save();
    }catch(e){    
        throw Error("Ocurrio un error mientras se creaba Hotel");
    }
}

exports.updateHotel = async (hotel) => {
    const id = hotel.id;
    try{    
        const oldHotel = await Hotel.findById(id);
    }catch(e){
        throw Error("Ocurrio un error mientras se buscaba el Hotel");
    }

    if(!oldHotel){
        return false;
    }
    oldHotel.name = hotel.name
    oldHotel.stars = hotel.stars
    oldHotel.price = hotel.price
    oldHotel.image = hotel.image
    oldHotel.amenities = hotel.amenities

    try{
        const savedHotel = await oldHotel.save();
        return savedHotel;
    }catch(e){
        throw Error("Y ocurrio un error mientras se actualizaba el Hotel");
    }
}

exports.deleteHotel = async (id) => {
    try{
        const deleted = await Hotel.remove({_id: id});
        if(deleted.result.n === 0){
            throw Error("El Hotel no pude ser eliminado");
        }
        return deleted;
    }catch(e){
        throw Error("Ocurrio un error mientras se eliminaba el Hotel");
    }
}