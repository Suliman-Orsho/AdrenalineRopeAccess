using AdrenalineRopeAccess.Dtos.Uploaders;
using AdrenalineRopeAccess.WebApi.Attributes;
using AdrenalineRopeAccess.WebApi.Helpers.ImageUploader;
using Microsoft.AspNetCore.Mvc;

namespace AdrenalineRopeAccess.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        #region Data and Const

        private readonly IImageUploader _fileUploader;

        public UploadController(IImageUploader fileUploader)
        {
            _fileUploader = fileUploader;
        }

        #endregion

        #region Services

        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload([AllowedExtensions()] IFormFile[] files)
        {
            if (files.Length > 0)
            {
                var imagesNames = _fileUploader.Upload(files);

                var imagesDtos = GetImageDtos(imagesNames);

                return Ok(imagesDtos);
            }
            else
            {
                return BadRequest();
            }
        }

        #endregion

        #region Private Methods

        private List<UploaderImageDto> GetImageDtos(List<string> imagesNames)
        {
            var imagesNamesDtos = new List<UploaderImageDto>();

            foreach (var imageName in imagesNames)
            {
                var Image = new UploaderImageDto();
                Image.Id = 0;
                Image.Name = imageName;

                imagesNamesDtos.Add(Image);
            }

            return imagesNamesDtos;
        }

        #endregion
    }
}
