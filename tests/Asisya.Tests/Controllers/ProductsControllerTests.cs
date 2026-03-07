using Moq;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using Asisya.API.Controllers;
using Asisya.Domain.Interfaces; // El namespace correcto donde vive IProductRepository
using Asisya.Domain.Entities;

namespace Asisya.Tests.Controllers
{
    public class ProductsControllerTests
    {
        private readonly Mock<IProductRepository> _productRepoMock; // Cambiado de Service a Repository
        private readonly ProductsController _controller;

        public ProductsControllerTests()
        {
            // 1. Creamos el "Mock" del Repositorio
            _productRepoMock = new Mock<IProductRepository>();

            // 2. Inyectamos el mock en el controlador
            _controller = new ProductsController(_productRepoMock.Object);
        }       

        [Fact] // Agregamos este atributo para que xUnit reconozca el test
        public async Task GetById_ReturnsOk_WhenProductExists()
        {
            // ARRANGE (Preparar)
            var productId = 1;
            var fakeProduct = new Product { ProductId = productId, ProductName = "Test Product" };
            
            // Configuramos el Mock para que cuando llamen a GetByIdAsync devuelva nuestro producto falso
            _productRepoMock.Setup(r => r.GetByIdAsync(productId))
                            .ReturnsAsync(fakeProduct);

            // ACT (Actuar)
            var result = await _controller.GetById(productId);

            // ASSERT (Verificar)
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedProduct = Assert.IsType<Product>(okResult.Value);
            Assert.Equal(productId, returnedProduct.ProductId);
        }
    }
}