using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdrenalineRopeAccess.EfCore;
using AdrenalineRopeAccess.Entities;
using AutoMapper;
using AdrenalineRopeAccess.Dtos.Equipments;
using AdrenalineRopeAccess.Dtos.Projects;

namespace AdrenalineRopeAccess.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EquipmentsController : ControllerBase
    {
        #region Data And Constructor
        private readonly AdrenalineDbContext _context;
        private readonly IMapper _mapper;

        public EquipmentsController(AdrenalineDbContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        #endregion

        #region Actions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EquipmentListDto>>> GetEquipments()
        {
            var equipments = await _context.Equipments
                                           .Include(e => e.Project)
                                           .ToListAsync();

            var equipmentsDto = _mapper.Map<List<EquipmentListDto>>(equipments);

            return equipmentsDto;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EquipmentDetailsDto>> GetEquipment(int id)
        {

            var equipment = await _context.Equipments
                                          .Include(e => e.Project)
                                          .SingleAsync(e => e.Id == id);

            if (equipment == null)
            {
                return NotFound();
            }

            var equipmentDto = _mapper.Map<EquipmentDetailsDto>(equipment);

            return equipmentDto;
        }

        [HttpPost]
        public async Task<IActionResult> CreateEquipment(EquipmentDto equipmentDto)
        {
            var equipment = _mapper.Map<Equipment>(equipmentDto);

            equipment.Project = await _context.Projects.Where(p => p.Id == equipmentDto.ProjectId).SingleOrDefaultAsync();



            _context.Equipments.Add(equipment);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditEquipment(int id, EquipmentDto equipmentDto)
        {
            var equipment = await _context.Equipments
                                          .Include(e => e.Project)
                                          .SingleAsync(e => e.Id == id);

            _mapper.Map(equipmentDto, equipment);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EquipmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEquipment(int id)
        {

            var equipment = await _context.Equipments.FindAsync(id);

            if (equipment == null)
            {
                return NotFound();
            }

            _context.Equipments.Remove(equipment);
            await _context.SaveChangesAsync();

            return NoContent();
        } 
        #endregion

        #region Private Methods
        private bool EquipmentExists(int id)
        {
            return (_context.Equipments?.Any(e => e.Id == id)).GetValueOrDefault();
        } 
        #endregion
    }
}
