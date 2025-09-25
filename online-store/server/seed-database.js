require('dotenv').config()
const sequelize = require('./db')
const { User, Device, Type, Brand, DeviceInfo } = require('./models/models')

const seedDatabase = async () => {
    try {
        console.log('🔄 Подключение к базе данных...')
        await sequelize.authenticate()
        
        console.log('🔄 Синхронизация моделей...')
        await sequelize.sync({ force: false })
        
        console.log('🔄 Создание типов товаров...')
        const types = await Type.bulkCreate([
            { name: 'Смартфоны' },
            { name: 'Ноутбуки' },
            { name: 'Планшеты' }
        ], { ignoreDuplicates: true })
        
        console.log('🔄 Создание брендов...')
        const brands = await Brand.bulkCreate([
            { name: 'Apple' },
            { name: 'Samsung' },
            { name: 'Xiaomi' },
            { name: 'HP' },
            { name: 'Dell' }
        ], { ignoreDuplicates: true })
        
        console.log('🔄 Создание товаров...')
        const devices = await Device.bulkCreate([
            {
                name: 'iPhone 14 Pro',
                price: 120000,
                rating: 5,
                img: '0c80d66c-3e86-402d-92f4-14f4a0d5d8c7.jpg',
                typeId: 1,
                brandId: 1
            },
            {
                name: 'Samsung Galaxy S23',
                price: 85000,
                rating: 4,
                img: '0da16062-c12b-4c01-913b-ec3a60ba0b7a.jpg',
                typeId: 1,
                brandId: 2
            },
            {
                name: 'Xiaomi 13',
                price: 55000,
                rating: 4,
                img: '0edac1f1-766c-4490-9e8e-5dcc81fcb13f.jpg',
                typeId: 1,
                brandId: 3
            },
            {
                name: 'MacBook Pro 16',
                price: 180000,
                rating: 5,
                img: '22e891e4-d020-4006-a60b-2be97b62672e.jpg',
                typeId: 2,
                brandId: 1
            },
            {
                name: 'Dell XPS 13',
                price: 95000,
                rating: 4,
                img: '25e8795f-cac0-46ed-904a-09cf83337a21.jpg',
                typeId: 2,
                brandId: 5
            }
        ], { ignoreDuplicates: true })
        
        console.log('✅ База данных успешно заполнена!')
        console.log(`📊 Создано: ${types.length} типов, ${brands.length} брендов, ${devices.length} товаров`)
        
        process.exit(0)
    } catch (error) {
        console.error('❌ Ошибка при заполнении базы данных:', error)
        process.exit(1)
    }
}

seedDatabase()