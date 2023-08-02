using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdrenalineRopeAccess.EfCore;
using AutoMapper;
using AdrenalineRopeAccess.Dtos.Employees;
using AdrenalineRopeAccess.Dtos.Lookups;
using AdrenalineRopeAccess.Entities.Employees;

namespace AdrenalineRopeAccess.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        #region Data And Constructor
        private readonly AdrenalineDbContext _context;
        private readonly IMapper _mapper;

        public EmployeesController(AdrenalineDbContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        #endregion

        #region Actions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeListDto>>> GetEmployees()
        {
            var employees = await _context.Employees
                                          .ToListAsync();

            var employeesDto = _mapper.Map<List<EmployeeListDto>>(employees);

            return employeesDto;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDetailsDto>> GetEmployee(int id)
        {

            var employee = await _context.Employees
                                         .Include(e => e.Advances)
                                         .Include(e => e.Images)
                                         .Include(e => e.Projects)
                                         .SingleOrDefaultAsync(e => e.Id == id);

            if (employee == null)
            {
                return NotFound();
            }

            var empDto = _mapper.Map<EmployeeDetailsDto>(employee);

            return empDto;
        }

        [HttpPost]
        public async Task<ActionResult> CreateEmployee(EmployeeDto employeeDto)
        {
            var employee = _mapper.Map<Employee>(employeeDto);

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditEmployee(int id, EmployeeDto employeeDto)
        {
            var employee = await _context.Employees
                                         .Include (e => e.Images)
                                         .SingleAsync(e => e.Id == id);

            _mapper.Map(employeeDto, employee);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
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

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDto>> GetEmployeeForEdit(int id)
        {
            var employee = await _context
                                    .Employees
                                    .Include(e => e.Images)
                                    .SingleOrDefaultAsync(c => c.Id == id);

            if (employee == null)
            {
                return NotFound();
            }

            var EmployeeDto = _mapper.Map<EmployeeDto>(employee);

            return EmployeeDto;
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {

            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult<List<LookupDto>>> GetEmployeesLookup()
        {
            return await _context
                        .Employees
                        .Select(p => new LookupDto { Id = p.Id, Name = p.FullName })
                        .ToListAsync();
        }
        #endregion

        #region Private Methods
        private bool EmployeeExists(int id)
        {
            return (_context.Employees?.Any(e => e.Id == id)).GetValueOrDefault();
        } 
        #endregion
    }
}
